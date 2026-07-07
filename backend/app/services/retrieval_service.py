import chromadb
from chromadb.config import Settings

from app.services.embedding_service import EmbeddingService


class RetrievalService:
    """
    Performs semantic search on indexed document chunks.
    """

    def __init__(self):

        self.embedding_service = EmbeddingService()

        self.client = chromadb.PersistentClient(
            path="chroma_db",
            settings=Settings(anonymized_telemetry=False),
        )

        self.collection = self.client.get_collection(
            "documents"
        )

    def search(
        self,
        query: str,
        top_k: int = 5,
    ):

        query_embedding = self.embedding_service.embed_text(query)

        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
        )

        return results