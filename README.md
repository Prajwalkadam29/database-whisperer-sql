
# SQL Whisperer with LangChain Integration

SQL Whisperer is a web application that transforms natural language questions into optimized SQL queries for different database management systems.

## Features

- Convert natural language to SQL queries
- Support for multiple database types (MySQL, PostgreSQL, Oracle, SQL Server, SQLite)
- Schema-aware query generation
- Detailed SQL explanations

## Setup

### Frontend (React)

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

### Backend (Python with LangChain)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install requirements:
   ```
   pip install -r requirements.txt
   ```

5. Set up your OpenAI API key:
   ```
   export OPENAI_API_KEY=your_api_key_here
   ```
   
   Or create a .env file in the backend directory:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

6. Run the Flask server:
   ```
   python langchain_sql_service.py
   ```

## Usage

1. Start both the frontend and backend servers
2. Enter your database schema in the Schema input
3. Select your database type
4. Ask a question about your data
5. Get the generated SQL query optimized for your database
