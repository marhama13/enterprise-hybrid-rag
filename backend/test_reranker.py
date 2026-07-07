from app.services.retrieval.hybrid_service import HybridService
from app.services.retrieval.reranker_service import RerankerService

hybrid = HybridService()
reranker = RerankerService()

results = hybrid.search(
    "What is a constructor?"
)

reranked = reranker.rerank(
    "What is a constructor?",
    results,
)

print("\n" + "=" * 80)
print("🏆 Reranked Results")
print("=" * 80)

for i, result in enumerate(reranked):

    print(f"\nRank #{i+1}")

    print(f"Score : {result['rerank_score']:.4f}")

    print(
        f"Document : {result['metadata']['document_name']}"
    )

    print(
        f"Page : {result['metadata']['page_number']}"
    )

    print(result["text"][:350])

    print("-" * 80)