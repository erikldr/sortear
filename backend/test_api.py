#!/usr/bin/env python
import requests
import json
import sys
from datetime import date

BASE_URL = "http://127.0.0.1:8001/api"

def print_response(resp):
    print(f"Status: {resp.status_code}")
    print(f"Headers: {resp.headers}")
    try:
        print(f"Body: {json.dumps(resp.json(), indent=2, ensure_ascii=False)}")
    except:
        print(f"Body: {resp.text}")

# 1. Criar um usuário
def create_user():
    print("\n=== Criando usuário ===")
    user_data = {
        "nome": "Administrador",
        "email": "admin@example.com",
        "radio": "Rádio FM 98.5",
        "senha": "password123"
    }
    
    resp = requests.post(f"{BASE_URL}/usuarios/", json=user_data)
    print_response(resp)
    
    if resp.status_code == 201:
        return resp.json()
    return None

# 2. Fazer login
def login(email, password):
    print("\n=== Fazendo login ===")
    login_data = {
        "username": email,
        "password": password
    }
    
    resp = requests.post(f"{BASE_URL}/login", data=login_data)
    print_response(resp)
    
    if resp.status_code == 200:
        return resp.json().get("access_token")
    return None

# 3. Obter perfil do usuário
def get_profile(token):
    print("\n=== Obtendo perfil do usuário ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    resp = requests.get(f"{BASE_URL}/usuarios/me", headers=headers)
    print_response(resp)

# 4. Criar uma promoção
def create_promotion(token):
    print("\n=== Criando promoção ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Criar dados para uma promoção
    promotion_data = {
        "nome": "Promoção de Verão",
        "descricao": "Concorra a ingressos para o show de verão!",
        "data_inicio": str(date.today()),
        "data_fim": "2025-12-31",
        "status": "ativa"
    }
    
    resp = requests.post(f"{BASE_URL}/promocoes/", json=promotion_data, headers=headers)
    print_response(resp)
    
    if resp.status_code == 201:
        return resp.json()
    return None

# 5. Listar promoções
def list_promotions(token):
    print("\n=== Listando promoções ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    resp = requests.get(f"{BASE_URL}/promocoes/", headers=headers)
    print_response(resp)

def main():
    # Passo 1: Criar um usuário
    user = create_user()
    
    if not user:
        print("Falha ao criar usuário. Tentando fazer login com credenciais padrão.")
        token = login("admin@example.com", "password123")
    else:
        # Passo 2: Fazer login
        token = login(user["email"], "password123")
    
    if not token:
        print("Falha ao fazer login. Encerrando.")
        sys.exit(1)
    
    # Passo 3: Obter perfil do usuário
    get_profile(token)
    
    # Passo 4: Criar uma promoção
    promotion = create_promotion(token)
    
    # Passo 5: Listar promoções
    if promotion:
        list_promotions(token)

if __name__ == "__main__":
    main()