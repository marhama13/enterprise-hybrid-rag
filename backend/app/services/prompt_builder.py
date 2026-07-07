class PromptBuilder:

    @staticmethod
    def build(question: str, contexts: list) -> str:

        context_text = ""

        for chunk in contexts:

            meta = chunk["metadata"]

            context_text += f"""
Document : {meta['document_name']}
Page     : {meta['page_number']}
Chunk    : {meta['chunk_number']}

{chunk['text']}

---------------------------------------
"""

        return f"""
You are an Enterprise Knowledge Assistant.

Use ONLY the provided context to answer the question.

If the answer cannot be found in the context, reply exactly:

"I couldn't find this information in the uploaded documents."

Context:

{context_text}

Question:
{question}

Answer:
"""