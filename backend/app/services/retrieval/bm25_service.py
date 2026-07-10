import json
from pathlib import Path

from rank_bm25 import BM25Okapi


class BM25Service:
    """
    Keyword-based retrieval using BM25.
    """

    def __init__(self):

        self.documents = []
        self.metadata = []

        processed_dir = Path("processed")

        for file in processed_dir.glob("*.json"):

            with open(file, "r", encoding="utf-8") as f:
                data = json.load(f)

            for chunk in data["chunks"]:

                self.documents.append(chunk["text"])

                self.metadata.append(
                    {
                        "document_name": chunk["document_name"],
                        "page_number": chunk["page_number"],
                        "chunk_number": chunk["chunk_number"],
                    }
                )

        tokenized_docs = [
            doc.lower().split()
            for doc in self.documents
        ]

        # ✅ Prevent crash when no documents exist
        if len(tokenized_docs) == 0:
            self.bm25 = None
            return

        self.bm25 = BM25Okapi(tokenized_docs)

    def search(
        self,
        query,
        top_k=5,
        document_name=None,
    ):

        # ✅ No indexed documents yet
        if self.bm25 is None:
            return []

        tokenized_query = query.lower().split()

        scores = self.bm25.get_scores(tokenized_query)

        ranked = sorted(
            enumerate(scores),
            key=lambda x: x[1],
            reverse=True,
        )

        results = []

        for index, score in ranked:

            if score <= 0:
                continue

            if (
                document_name
                and self.metadata[index]["document_name"] != document_name
            ):
                continue

            results.append(
                {
                    "score": float(score),
                    "text": self.documents[index],
                    "metadata": self.metadata[index],
                }
            )

            if len(results) >= top_k:
                break

        return results