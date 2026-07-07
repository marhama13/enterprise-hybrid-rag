from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "message": "Upload Successful"
    }


@router.get("/files")
async def list_files():

    files = []

    for filename in os.listdir(UPLOAD_DIR):

        filepath = os.path.join(UPLOAD_DIR, filename)

        if os.path.isfile(filepath):

            files.append({
                "filename": filename,
                "size": round(os.path.getsize(filepath) / 1024, 2)
            })

    return files


@router.delete("/{filename}")
async def delete_file(filename: str):

    filepath = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(filepath):
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    os.remove(filepath)

    return {
        "message": "Deleted Successfully"
    }