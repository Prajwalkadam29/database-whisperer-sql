
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

# SQL generation template based on database type
sql_prompt_template = """
You are a SQL expert. Given the following database schema and a question, generate the most efficient SQL query to answer the question.
The query should be optimized for the specified database type.

Database Schema:
{schema}

Database Type: {dbms_type}

User Question: {question}

Return only the SQL query without any additional text or explanations.
Make sure the SQL syntax is correct for {dbms_type}.
"""

# Output parser
output_parser = StrOutputParser()

# Create the prompt from the template
prompt = PromptTemplate(
    template=sql_prompt_template,
    input_variables=["schema", "dbms_type", "question"]
)

# Create the LangChain chain
chain = prompt | llm | output_parser

@app.route('/generate-sql', methods=['POST'])
def generate_sql():
    data = request.json
    
    if not data or 'schema' not in data or 'question' not in data or 'dbms_type' not in data:
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
        
        return jsonify({
            "sql": sql_query,
            "explanation": explanation
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
