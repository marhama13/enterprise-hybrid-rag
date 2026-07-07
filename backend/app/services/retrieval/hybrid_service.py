from app.services.retrieval.bm25_service import BM25Service
from app.services.retrieval.vector_service import VectorService
from app.services.retrieval.reranker_service import RerankerService

class HybridService:
    """
    Combines BM25 and Vector Search results.
    """

    def __init__(self):

        self.vector = VectorService()
        self.bm25 = BM25Service()
        self.reranker = RerankerService()

    def search(
    self,
    query,
    top_k=20,
    document_name=None,
):

        vector_results = self.vector.search(
            query,
            top_k,
            document_name,
        )

        bm25_results = self.bm25.search(
            query,
            top_k,
            document_name,
        )

        merged = []

        seen = set()

        # Vector Results
        for doc, meta, dist in zip(
            vector_results["documents"][0],
            vector_results["metadatas"][0],
            vector_results["distances"][0],
        ):

            key = (
                meta["document_name"],
                meta["page_number"],
                meta["chunk_number"],
            )

            if key not in seen:

                seen.add(key)

                merged.append(
                    {
                        "source": "Vector",
                        "score": dist,
                        "text": doc,
                        "metadata": meta,
                    }
                )

        # BM25 Results
        for item in bm25_results:

            key = (
                item["metadata"]["document_name"],
                item["metadata"]["page_number"],
                item["metadata"]["chunk_number"],
            )

            if key not in seen:

                seen.add(key)

                merged.append(
                    {
                        "source": "BM25",
                        "score": item["score"],
                        "text": item["text"],
                        "metadata": item["metadata"],
                    }
                )

        reranked = self.reranker.rerank(
    query=query,
    results=merged,
)

        return reranked