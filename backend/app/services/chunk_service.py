import re
import uuid


class TextProcessor:
    """
    Cleans extracted PDF text and creates structured chunks.
    """

    @staticmethod
    def clean(text: str) -> str:
        text = re.sub(r"[ \t]+", " ", text)
        text = re.sub(r"\n{2,}", "\n", text)
        return text.strip()

    @staticmethod
    def chunk_text(
        text: str,
        document_name: str,
        page_number: int,
        chunk_size: int = 800,
        overlap: int = 100,
    ):
        chunks = []

        start = 0
        chunk_index = 1

        while start < len(text):

            end = start + chunk_size

            chunk_text = text[start:end]

            chunks.append(
                {
                    "id": str(uuid.uuid4()),
                    "document_name": document_name,
                    "page_number": page_number,
                    "chunk_number": chunk_index,
                    "text": chunk_text,
                    "char_count": len(chunk_text),
                    "start_offset": start,
                    "end_offset": min(end, len(text)),
                }
            )

            chunk_index += 1
            start += chunk_size - overlap

        return chunks