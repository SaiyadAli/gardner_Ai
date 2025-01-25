from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGODB_DB_NAME")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InterviewRequest(BaseModel):
    question: str

@app.post("/interview")
async def interview(request: InterviewRequest):
    # Placeholder for RAG-LangChain integration
    response = {"answer": "This is a placeholder response."}
    # Save question and response to MongoDB
    db.interviews.insert_one({"question": request.question, "answer": response["answer"]})
    return response

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Speech-to-Speech AI Interviewing API"}
