#!/usr/bin/env python
import requests
import json
import sys
from datetime import date, datetime, timedelta

BASE_URL = "http://127.0.0.1:8002/api"

def print_response(resp):
    print(f"Status: {resp.status_code}")
    try:
        print(f"Body: {json.dumps(resp.json(), indent=2, ensure_ascii=False)}")
    except:
        print(f"Body: {resp.text}")
    print("-" * 50)

# Login e obter token de acesso
def login(email="admin@example.com", password="password123"):
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

# Criar uma promoção
def create_promotion(token):
    print("\n=== Criando promoção ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Criar dados para uma promoção
    promotion_data = {
        "nome": "Promoção Dia das Mães",
        "descricao": "Concorra a um jantar especial para o Dia das Mães!",
        "data_inicio": str(date.today()),
        "data_fim": str(date.today() + timedelta(days=30)),
        "status": "ativa"
    }
    
    resp = requests.post(f"{BASE_URL}/promocoes/", json=promotion_data, headers=headers)
    print_response(resp)
    
    if resp.status_code == 201:
        return resp.json()
    return None

# Adicionar participantes
def add_participants(token, promotion_id):
    print("\n=== Adicionando participantes ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Lista de participantes para adicionar
    participants_data = [
        {
            "nome": "João Silva",
            "telefone": "11987654321",
            "email": "joao@example.com",
            "promocao_id": promotion_id
        },
        {
            "nome": "Maria Oliveira",
            "telefone": "11912345678",
            "email": "maria@example.com",
            "promocao_id": promotion_id
        },
        {
            "nome": "Pedro Santos",
            "telefone": "11955556666",
            "email": "pedro@example.com",
            "promocao_id": promotion_id
        },
        {
            "nome": "Ana Pereira",
            "telefone": "11933334444",
            "email": "ana@example.com",
            "promocao_id": promotion_id
        }
    ]
    
    added_participants = []
    for participant_data in participants_data:
        resp = requests.post(f"{BASE_URL}/participantes/", json=participant_data, headers=headers)
        print(f"Adicionando {participant_data['nome']}")
        print_response(resp)
        
        if resp.status_code == 201:
            added_participants.append(resp.json())
    
    return added_participants

# Listar participantes de uma promoção
def list_participants(token, promotion_id):
    print("\n=== Listando participantes da promoção ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    resp = requests.get(f"{BASE_URL}/participantes/promocao/{promotion_id}", headers=headers)
    print_response(resp)
    
    if resp.status_code == 200:
        return resp.json()
    return []

# Criar um sorteio
def create_draw(token, promotion_id):
    print("\n=== Criando sorteio ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Data do sorteio (amanhã)
    tomorrow = datetime.now() + timedelta(days=1)
    
    draw_data = {
        "promocao_id": promotion_id,
        "data_sorteio": tomorrow.isoformat(),
        "descricao": "Sorteio do Dia das Mães - Jantar especial"
    }
    
    resp = requests.post(f"{BASE_URL}/sorteios/", json=draw_data, headers=headers)
    print_response(resp)
    
    if resp.status_code == 201:
        return resp.json()
    return None

# Executar um sorteio
def execute_draw(token, draw_id):
    print("\n=== Executando sorteio ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    draw_execute_data = {
        "quantidade": 2  # Sortear 2 ganhadores
    }
    
    resp = requests.post(f"{BASE_URL}/sorteios/{draw_id}/executar", json=draw_execute_data, headers=headers)
    print_response(resp)
    
    if resp.status_code == 200:
        return resp.json()
    return None

# Listar ganhadores
def list_winners(token, draw_id):
    print("\n=== Listando ganhadores ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    resp = requests.get(f"{BASE_URL}/sorteios/{draw_id}/ganhadores", headers=headers)
    print_response(resp)
    
    if resp.status_code == 200:
        return resp.json()
    return []

def main():
    # Fazer login
    token = login()
    
    if not token:
        print("Falha ao fazer login. Encerrando.")
        sys.exit(1)
    
    # Criar uma promoção
    promotion = create_promotion(token)
    
    if not promotion:
        print("Falha ao criar promoção. Encerrando.")
        sys.exit(1)
    
    promotion_id = promotion["id"]
    
    # Adicionar participantes
    participants = add_participants(token, promotion_id)
    
    if not participants:
        print("Falha ao adicionar participantes. Encerrando.")
        sys.exit(1)
    
    # Listar participantes
    list_participants(token, promotion_id)
    
    # Criar um sorteio
    draw = create_draw(token, promotion_id)
    
    if not draw:
        print("Falha ao criar sorteio. Encerrando.")
        sys.exit(1)
    
    draw_id = draw["id"]
    
    # Executar o sorteio
    winners = execute_draw(token, draw_id)
    
    if not winners:
        print("Falha ao executar sorteio. Encerrando.")
        sys.exit(1)
    
    # Listar ganhadores
    list_winners(token, draw_id)

if __name__ == "__main__":
    main()