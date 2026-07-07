import fitz  # PyMuPDF
from pathlib import Path


class PDFParser:
    """
    Service responsible for extracting text from PDF documents.
    """

    @staticmethod
    def extract_text(pdf_path: str):
        """
        Extract text page-by-page from a PDF.

        Returns:
            list[dict]
        """

        pdf_path = Path(pdf_path)

        if not pdf_path.exists():
            raise FileNotFoundError(f"{pdf_path} does not exist.")

        document = fitz.open(pdf_path)

        pages = []

        for page_number, page in enumerate(document, start=1):

            text = page.get_text("text")

            pages.append(
                {
                    "page": page_number,
                    "text": text,
                }
            )

        document.close()

        return pages