def create_teaching_validation_prompt(context, user_input):
    """Create a structured prompt for validating teaching content."""
    return f"""You are an expert in RLHF (Reinforcement Learning from Human Feedback) evaluating a student's explanation.

Context about {context['topic']}:
{context['description']}

Key points that should be covered:
{'. '.join(context['key_points'])}

Student's explanation:
{user_input}

Please evaluate this explanation and provide feedback:
1. Accuracy: Is the explanation correct?
2. Completeness: Are all key points covered?
3. Clarity: Is it well-explained?
4. Suggestions: What could be improved?

Your response should be clear, specific, and constructive. Format as:
Feedback: [Your main feedback points]
Rating: [1-5 stars]
Improvement suggestions: [Specific points to improve]
"""

def create_chat_prompt(context, user_question):
    """Create a structured prompt for answering questions."""
    return f"""You are a helpful AI teaching assistant explaining RLHF concepts.

Context about {context['topic']}:
{context['description']}

Key information:
{'. '.join(context['key_points'])}

User question: {user_question}

Provide a clear, concise explanation that:
1. Directly answers the question
2. Uses analogies when helpful
3. Connects to practical examples
4. Maintains technical accuracy

Your response:
"""