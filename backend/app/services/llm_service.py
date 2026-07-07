import ollama


class LLMService:

    MODEL_NAME = "llama3.1"

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
        )

        return response["message"]["content"]