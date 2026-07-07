class PromptBuilder:

    @staticmethod
    def build(question: str, contexts: list) -> str:

        context_text = ""

        for chunk in contexts[:3]:

            meta = chunk["metadata"]

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
1. Use ONLY the provided context.
2. Do NOT invent or assume information.
3. If the answer is not present in the context, reply exactly:
   "I couldn't find this information in the uploaded documents."
4. Do NOT mention page numbers, chunk numbers, or document names unless the user explicitly asks for them.
5. If multiple context chunks contain the answer, combine the information into one concise response.
6. Keep the answer clear, professional, and easy to understand.

==================== CONTEXT ====================

{context_text}

=================================================

Question:
{question}

Answer:
"""