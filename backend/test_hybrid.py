from app.services.retrieval.hybrid_service import HybridService

hybrid = HybridService()

results = hybrid.search(
    query="What is a constructor?",
    document_name="PPL task 7.pdf"
)

print("\n" + "=" * 80)
print("🚀 Enterprise Hybrid Search")
print("=" * 80)

for i, result in enumerate(results):

    print(f"\nRank #{i+1}")

    print(f"Source   : {result['source']}")

    print(f"Score    : {result['rerank_score']:.4f}")

    print(f"Document : {result['metadata']['document_name']}")

    print(f"Page     : {result['metadata']['page_number']}")

    print(f"Chunk    : {result['metadata']['chunk_number']}")

    print("\nText:")
    print("-" * 80)

    print(result["text"][:400])

    print("-" * 80)