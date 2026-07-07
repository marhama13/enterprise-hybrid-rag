from app.services.retrieval_service import RetrievalService

retriever = RetrievalService()

results = retriever.search(
    "What is a constructor?"
)

documents = results["documents"][0]
metadatas = results["metadatas"][0]
distances = results["distances"][0]

print("\n" + "=" * 80)
print("🔍 Semantic Search Results")
print("=" * 80)

for i in range(len(documents)):
    print(f"\nResult #{i+1}")

    print(f"Document : {metadatas[i]['document_name']}")
    print(f"Page     : {metadatas[i]['page_number']}")
    print(f"Chunk    : {metadatas[i]['chunk_number']}")
    print(f"Distance : {distances[i]:.4f}")

    print("\nText:")
    print("-" * 80)
    print(documents[i][:500])
    print("-" * 80)