# 🤖 AI Application Learning

**AI Application Development · LLMs · Prompt Engineering · Structured Outputs · Embeddings · Vector Search · pgvector · RAG · Semantic Search · Next.js · TypeScript**

Hands-on learning project focused on building **AI-powered full-stack applications** and understanding the technologies behind modern AI systems.

Built incrementally through real implementations, progressing from basic LLM APIs to **embeddings, vector search, and Retrieval-Augmented Generation (RAG)**.

---

## 🗺️ Learning Progression

```text
LLM
 ↓
Prompt Engineering
 ↓
Structured Outputs
 ↓
Embeddings
 ↓
Vector Storage
 ↓
Semantic Search
 ↓
RAG
 ↓
Agents
 ↓
Evaluation
 ↓
Production AI
```

---

## 🔌 Endpoints

| Endpoint               | Concept            | Purpose                                                  |
| ---------------------- | ------------------ | -------------------------------------------------------- |
| `/generate`            | LLM API            | Generate a response using Gemini                         |
| `/customer-response`   | Structured Output  | Generate and validate structured JSON                    |
| `/embeddings`          | Embeddings         | Convert text into vector representations                 |
| `/documents`           | Vector Database    | Store and retrieve documents                             |
| `/document-embeddings` | Document Ingestion | Generate and store document embeddings                   |
| `/vector-search`       | Semantic Search    | Find documents using semantic similarity                 |
| `/rag`                 | RAG                | Retrieve relevant context and generate a grounded answer |

---

## 🔄 Current RAG Architecture

```text
                    User Question
                         ↓
                  Query Embedding
                         ↓
                  Vector Search
                         ↓
                 Relevant Documents
                         ↓
                   Build Context
                         ↓
                       Gemini
                         ↓
              Grounded Answer + Sources
```

### Document Flow

```text
Documents
    ↓
Generate Embeddings
    ↓
PostgreSQL + pgvector
    ↓
Vector Search
    ↓
RAG
```

---

## 🧠 Concepts Learned

### LLMs & Prompting

- [x] LLM APIs
- [x] Prompt engineering
- [x] System instructions
- [x] Structured outputs
- [x] JSON validation
- [x] Hallucinations
- [x] Context windows

### Embeddings & Vector Search

- [x] Embeddings
- [x] Semantic similarity
- [x] Cosine similarity
- [x] Vector databases
- [x] PostgreSQL + pgvector
- [x] Top-K retrieval
- [x] Similarity thresholds
- [x] Metadata filtering
- [x] ANN / HNSW
- [x] Hybrid search
- [x] Reranking
- [x] Retrieval quality

### RAG

- [x] Document ingestion
- [x] Document chunking
- [x] Retrieval
- [x] Context injection
- [x] Grounding
- [x] Context limitations

---

## 🚀 Coming Next

The project will continue expanding as new AI application concepts are learned and implemented:

- [ ] Tool / function calling
- [ ] AI agents
- [ ] Agent state and memory
- [ ] Guardrails
- [ ] LangChain
- [ ] LangGraph
- [ ] OpenAI Agents SDK
- [ ] LangSmith
- [ ] AI evaluation
- [ ] AI observability
- [ ] AI security
- [ ] Production AI patterns

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Next.js Route Handlers, Node.js
- **AI:** Gemini API
- **Database:** Supabase, PostgreSQL, pgvector

---

## 🎯 Project Goal

Learn AI application development by **building real functionality**, rather than only studying the theory.

The project progressively connects the individual components of modern AI applications:

```text
LLM
 ↓
Embeddings
 ↓
Vector Search
 ↓
RAG
 ↓
Tools
 ↓
Agents
 ↓
Orchestration
 ↓
Evaluation
 ↓
Production AI
```

The goal is to understand not only **how to use AI APIs**, but how to design and build reliable **AI-powered full-stack applications**.
