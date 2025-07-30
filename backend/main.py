from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch
import os

app = Flask(__name__)
CORS(app)
# Load base model
base_model_name = "Qwen/Qwen3-4B"
device = "cuda" if torch.cuda.is_available() else "cpu"

base_model = AutoModelForCausalLM.from_pretrained(base_model_name, torch_dtype=torch.float16)
tokenizer = AutoTokenizer.from_pretrained(base_model_name)

# Load LoRA adapter
adapter_path = "backend/model/chatbot_model.pth"
model = PeftModel.from_pretrained(base_model, adapter_path, is_trainable=False)
model = model.to(device)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "")
    print("Received message:", user_input)

    inputs = tokenizer(user_input, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model.generate(**inputs, max_new_tokens=100)

    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(port=8000)
