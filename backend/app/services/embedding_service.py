from sentence_transformers import SentenceTransformer


class EmbeddingService:
    """
    Generates embeddings using Sentence Transformers.
    """

    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def embed_text(self, text: str):
        """
        Generate embedding for a single piece of text.
        """
        return self.model.encode(text).tolist()

    def embed_documents(self, texts: list[str]):
        """
        Generate embeddings for multiple texts.
        """
        return self.model.encode(texts).tolist()