# Documentation
```
https://documenter.getpostman.com/view/17301223/2sAXjDfbGU
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Boye-dev/p2vest-assessment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd p2vest-assessment
   ```
3. Create a `.env` file in the root directory and configure your environment variables:

    ```bash
    DB_PASSSWORD=your_database_password
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_user_name
    PORT=your_port
    ```
4. Install dependencies:

    ```bash
    pnpm install
    ```


5. Start the development server:

    ```bash
    pnpm run dev
    ```

6. Run migrations:

    ```bash
    pnpm migrate
    ```

