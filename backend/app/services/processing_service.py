import json
from pathlib import Path

from app.services.parser_service import PDFParser
from app.services.chunk_service import TextProcessor


class DocumentProcessor:

    PROCESSED_DIR = Path("processed")

    @classmethod
    def process_pdf(cls, pdf_path: str):

        cls.PROCESSED_DIR.mkdir(exist_ok=True)

        pdf_file = Path(pdf_path)

        document_name = pdf_file.name

        pages = PDFParser.extract_text(pdf_path)

        all_chunks = []

        for page in pages:

            clean_text = TextProcessor.clean(page["text"])

            chunks = TextProcessor.chunk_text(
                text=clean_text,
                document_name=document_name,
                page_number=page["page"],
            )

            all_chunks.extend(chunks)

        processed_document = {
            "document": document_name,
            "total_pages": len(pages),
            "total_chunks": len(all_chunks),
            "chunks": all_chunks,
        }

        output_file = cls.PROCESSED_DIR / f"{pdf_file.stem}.json"

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(processed_document, f, indent=4, ensure_ascii=False)

        return processed_document