from app.services.retrieval.bm25_service import BM25Service

bm25 = BM25Service()

results = bm25.search("Employee")

print("=" * 80)
print("BM25 Results")
print("=" * 80)

for i, result in enumerate(results):

    print(f"\nResult #{i+1}")

    print(f"Score : {result['score']:.4f}")

    print(
        f"Document : {result['metadata']['document_name']}"
    )

    print(
        f"Page : {result['metadata']['page_number']}"
    )

    print(result["text"][:400])

    print("-" * 80)