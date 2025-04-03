
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the LLM
llm = ChatOpenAI(model="gpt-3.5-turbo")

# ... keep existing code (SQL prompt template and chain setup)

@app.route('/generate-sql', methods=['POST'])
def generate_sql():
    print("Received request to /generate-sql")  # Debug log
    
    data = request.json
    print(f"Request data: {data}")  # Debug log
    
    if not data or 'schema' not in data or 'question' not in data or 'dbms_type' not in data:
        print("Missing required parameters")  # Debug log
        return jsonify({"error": "Missing required parameters"}), 400
    
    try:
        # Generate SQL using LangChain
        sql_query = chain.invoke({
            "schema": data['schema'],
            "dbms_type": data['dbms_type'],
            "question": data['question']
        })
        
        # Simple explanation generation
        explanation_prompt = f"""
        Explain in simple terms what this SQL query does:
        {sql_query}
        Keep the explanation under 100 words.
        """
        
        explanation = ChatOpenAI(model="gpt-3.5-turbo").invoke(explanation_prompt).content
        
        print(f"Generated SQL: {sql_query}")  # Debug log
        return jsonify({
            "sql": sql_query,
            "explanation": explanation
        })
    
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug log
        return jsonify({"error": str(e)}), 500

@app.route('/')
def health_check():
    return "Server is running!"

if __name__ == '__main__':
    print("Starting server on http://localhost:5000")  # Debug log
    app.run(host='0.0.0.0', port=5000, debug=True)

