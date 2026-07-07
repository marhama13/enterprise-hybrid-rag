from app.services.indexing_service import IndexingService

indexer = IndexingService()

count = indexer.index_processed_file(
    "processed/PPL task 7.json"
)

print(f"Indexed {count} chunks successfully!")