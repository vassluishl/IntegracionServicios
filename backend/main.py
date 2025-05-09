from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

# Permitir solicitudes desde cualquier origen (esto se puede restringir a tu dominio)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto a ["http://localhost:3000"] en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/data")
async def get_data():
    return {"message": "Hola desde FastAPI!"}

@app.get("/api/posts")
async def get_posts():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://jsonplaceholder.typicode.com/posts")
        return response.json()

@app.get("/api/posts/{post_id}")
async def get_post(post_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://jsonplaceholder.typicode.com/posts/{post_id}")
        return response.json()