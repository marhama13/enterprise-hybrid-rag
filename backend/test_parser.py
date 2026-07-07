from app.services.processing_service import DocumentProcessor

document = DocumentProcessor.process_pdf(
    "uploads/PPL task 7.pdf"
)

print("Processing Complete")

print(document["document"])

print(document["total_pages"])

print(document["total_chunks"])