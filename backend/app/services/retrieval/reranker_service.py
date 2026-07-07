from sentence_transformers import CrossEncoder


class RerankerService:
    """
    Reranks retrieved chunks using a Cross-Encoder model.
    """

    def __init__(self):
        self.model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

    def rerank(self, query: str, results: list):

        if not results:
            return []

        pairs = [
            (query, result["text"])
            for result in results
        ]

        scores = self.model.predict(pairs)

        for result, score in zip(results, scores):
            result["rerank_score"] = float(score)

        results.sort(
            key=lambda x: x["rerank_score"],
            reverse=True,
        )

        return results[:5]