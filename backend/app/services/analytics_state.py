class AnalyticsState:

    question_count = 0

    total_response_time = 0.0

    @classmethod
    def add_query(cls, response_time: float):

        cls.question_count += 1

        cls.total_response_time += response_time

    @classmethod
    def average_response_time(cls):

        if cls.question_count == 0:
            return 0

        return round(
            cls.total_response_time / cls.question_count,
            2,
        )