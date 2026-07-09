class PromptBuilder:

    @staticmethod
    def build(
        question: str,
        contexts: list,
        history: list = [],
    ) -> str:
        
        history_text = ""

        for message in history:

            role = "User" if message.role == "user" else "Assistant"

            history_text += f"{role}: {message.content}\n"

        context_text = ""

        for i, chunk in enumerate(contexts[:3], start=1):

            context_text += f"""
Context {i}

{chunk['text']}

--------------------------------------------------
"""

        return f"""
You are an Enterprise Knowledge Assistant.

Your job is to answer questions ONLY using the provided context.

Rules:

1. Use the previous conversation when it helps understand follow-up questions.

2. Never invent information.

3. If the answer is not present in the context, reply exactly:

"I couldn't find this information in the uploaded documents."

4. Keep answers concise and professional.

==================== CONVERSATION ====================

{history_text}

======================================================

======================= CONTEXT =======================

{context_text}

=======================================================

Current Question:

{question}

Answer:
"""