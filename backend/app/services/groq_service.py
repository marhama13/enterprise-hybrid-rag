import os
from groq import Groq


class GroqService:

    client = Groq(
        api_key=os.getenv("GROQ_API_KEY")
    )

    MODEL = os.getenv(
        "GROQ_MODEL",
        "llama-3.3-70b-versatile"
    )

    @classmethod
    def generate(cls, prompt: str) -> str:

        response = cls.client.chat.completions.create(
            model=cls.MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.1,
            max_tokens=500,
        )

        return response.choices[0].message.content