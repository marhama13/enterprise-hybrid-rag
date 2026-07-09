import ollama


class LLMService:

    MODEL_NAME = "llama3.2"

    @classmethod
    def generate(cls, prompt: str) -> str:
        """
        Send prompt to Ollama and return the generated response.
        """

        response = ollama.chat(
    model=cls.MODEL_NAME,
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    options={
        "temperature": 0.1,
        "num_predict": 180,
    },
)

        return response["message"]["content"]