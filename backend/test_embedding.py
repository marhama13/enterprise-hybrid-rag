from app.services.embedding_service import EmbeddingService

service = EmbeddingService()

embedding = service.embed_text(
    "A constructor initializes an object."
)

print(type(embedding))

print(len(embedding))

print(embedding[:10])