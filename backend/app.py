import os
os.environ["TOKENIZERS_PARALLELISM"] = "false"  # Set this before importing transformers

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch
from sentence_transformers import SentenceTransformer, util
import json

app = Flask(__name__)
CORS(app)

# Initialize the model and tokenizer
MODEL_NAME = "facebook/opt-350m"  # A smaller model that can run on CPU
device = torch.device('cpu')
print(f"Device set to use {device}")

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME).to(device)

# Set up text generation pipeline for better response generation
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    device=device
)

# Load sentence transformer for semantic search
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')

# Load RLHF knowledge base
KNOWLEDGE_BASE = {
    "concepts": [
        {
            "topic": "Introduction to RLHF",
            "description": "Reinforcement Learning from Human Feedback (RLHF) is a technique that helps align AI behavior with human preferences through a Reward Model (RM)",
            "key_points": [
                "The Reward Model acts like a teacher's assistant",
                "It learns to score AI outputs based on human preferences",
                "These scores guide the AI to generate more helpful responses",
                "Enables continuous improvement through feedback"
            ],
            "dialog_patterns": [
                {
                    "trigger": "teach you what a Reward Model is",
                    "response": "Awesome! I'm excited to learn. Let's begin — what does a Reward Model do?"
                },
                {
                    "trigger": "learns from human preferences",
                    "response": "Ah, so it learns to imitate human choices! But how does it decide numerically which one is better?"
                },
                {
                    "trigger": "scalar reward score",
                    "response": "Got it. And how is it trained? Do we use a loss function like in regular models?"
                },
                {
                    "trigger": "pairwise loss function",
                    "response": "That's helpful! Does this Reward Model directly update the language model too?"
                },
                {
                    "trigger": "PPO to give rewards",
                    "response": "Nice! One last thing — what could go wrong if the human feedback is biased?"
                },
                {
                    "trigger": "learn those biases",
                    "response": "Brilliant explanation! You're really thinking like an expert. 🎓 Would you like to test me with a small question now?"
                }
            ]
        },
        {
            "topic": "Core Components",
            "description": "RLHF consists of three main components: Base Model, Reward Model, and Policy Optimization",
            "key_points": [
                "Base Model: A pre-trained language model that serves as the starting point",
                "Reward Model: Learns to predict human preferences",
                "Policy Optimization: Updates the model to maximize predicted reward"
            ]
        },
        {
            "topic": "Reward Modeling",
            "description": "Reward modeling teaches AI systems what humans value by learning a reward function from human preferences",
            "key_points": [
                "Converts human preferences into trainable signals",
                "Uses pairwise comparisons for training",
                "Integrates with RL algorithms like PPO",
                "Loss function: LRM = −log(ra / (ra + rb))"
            ],
            "details": {
                "training_process": [
                    "Input: Model generates multiple outputs",
                    "Scoring: RM assigns scalar values to each output",
                    "Objective: Ensure RM(A) > RM(B) when humans prefer A over B"
                ],
                "integration": [
                    "Generation: Model produces candidate outputs",
                    "Evaluation: RM assigns scores to each output",
                    "Optimization: Policy is updated to maximize expected reward",
                    "Iteration: Process repeats with new outputs"
                ]
            }
        }
    ]
}

def get_relevant_context(query):
    """Find relevant information from knowledge base using semantic search"""
    query_embedding = sentence_model.encode(query, convert_to_tensor=True)
    
    contexts = []
    for concept in KNOWLEDGE_BASE["concepts"]:
        text = f"{concept['topic']}: {concept['description']} " + " ".join(concept['key_points'])
        contexts.append(text)
    
    context_embeddings = sentence_model.encode(contexts, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(query_embedding, context_embeddings)[0]
    
    most_similar_idx = similarities.argmax()
    return KNOWLEDGE_BASE["concepts"][most_similar_idx]

from utils.prompting import create_teaching_validation_prompt, create_chat_prompt

def validate_teaching(user_explanation):
    """Validate if the user's teaching aligns with RLHF concepts"""
    context = get_relevant_context(user_explanation)
    prompt = create_teaching_validation_prompt(context, user_explanation)
    
    inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(
        inputs.input_ids,
        max_length=200,
        temperature=0.7,
        top_p=0.9,
        do_sample=True
    )
    
    feedback = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return feedback

@app.route('/api/teach', methods=['POST'])
def teach_luma():
    data = request.json
    user_input = data.get('input', '')
    
    # Get feedback on the teaching
    feedback = validate_teaching(user_input)
    
    return jsonify({
        'feedback': feedback,
        'success': True
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data:
            print("No JSON data received")
            return jsonify({
                'error': 'No data received',
                'success': False
            }), 400
            
        user_message = data.get('message', '')
        if not user_message:
            print("No message in request")
            return jsonify({
                'error': 'No message provided',
                'success': False
            }), 400
            
        print(f"Received message: {user_message}")
        
        # Get relevant context
        context = get_relevant_context(user_message)
        print(f"Found context: {context['topic']}")
        
        # Check for predefined dialog patterns
        if "dialog_patterns" in context:
            for pattern in context["dialog_patterns"]:
                if pattern["trigger"].lower() in user_message.lower():
                    print(f"Matched pattern: {pattern['trigger']}")
                    return jsonify({
                        'response': pattern["response"],
                        'success': True
                    })
        
        # If no pattern matches, create a response based on context
        prompt = f"""
        Context about {context['topic']}:
        {context['description']}
        
        User question: {user_message}
        
        Assistant: Let me help explain this concept.
        """
    
        inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        outputs = model.generate(
            inputs.input_ids,
            max_length=200,
            temperature=0.7,
            top_p=0.9,
            do_sample=True
        )
        
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return jsonify({
            'response': response,
            'success': True
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'success': False
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource was not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred'
    }), 500

# Health check endpoint
@app.route('/')
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'TeachLuma API',
        'version': '1.0'
    })

if __name__ == '__main__':
    app.run(debug=True, port=3001)