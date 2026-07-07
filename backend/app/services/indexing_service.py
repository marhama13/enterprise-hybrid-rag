import json
from pathlib import Path

import chromadb
from chromadb.config import Settings

from app.services.embedding_service import EmbeddingService


class IndexingService:
    """
    Stores processed document chunks in ChromaDB.
    """

    def __init__(self):

        self.embedding_service = EmbeddingService()

        self.client = chromadb.PersistentClient(
            path="chroma_db",
            settings=Settings(anonymized_telemetry=False),
        )

        self.collection = self.client.get_or_create_collection(
            name="documents"
        )

    def index_processed_file(self, json_path: str):

        json_path = Path(json_path)

        with open(json_path, "r", encoding="utf-8") as f:
            document = json.load(f)

        chunks = document["chunks"]

        # Collect data
        ids = [chunk["id"] for chunk in chunks]

        documents = [chunk["text"] for chunk in chunks]

        metadatas = [
            {
                "document_name": chunk["document_name"],
                "page_number": chunk["page_number"],
                "chunk_number": chunk["chunk_number"],
            }
            for chunk in chunks
        ]

        # Generate all embeddings in one batch
        embeddings = self.embedding_service.embed_documents(documents)

        # Store everything in one call
        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        return len(chunks)