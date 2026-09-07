# 🤖 AI Learning Project

A hands-on project for learning how to build **AI-powered full-stack applications** using Next.js, TypeScript, Gemini, Supabase, PostgreSQL, pgvector, embeddings, semantic search, and RAG.

The project is built incrementally. Each endpoint and feature represents a concept learned along the AI development roadmap.

---

# 🗺️ Learning Progression

The project follows the concepts in the order they were learned and implemented.

```text
/generate
    ↓
/customer-response
    ↓
/embeddings
    ↓
/documents
    ↓
/document-embeddings
    ↓
/vector-search
    ↓
/rag
```

The progression is:

```text
LLM
 ↓
Structured Output
 ↓
Embeddings
 ↓
Vector Storage
 ↓
Semantic Search
 ↓
RAG
```

---

# 🧩 Endpoints

## `/generate`

**Concept:** LLM API

Basic endpoint for communicating with an LLM and generating a response from a prompt.

```text
User Prompt
    ↓
Next.js API
    ↓
Gemini API
    ↓
Generated Response
```

**Learned:**

- LLM API requests
- Prompts
- Model configuration
- API keys
- Error handling
- LLM responses

---

## `/customer-response`

**Concept:** Structured Output

Generates a structured customer-support response instead of free-form text.

```text
Customer Input
      ↓
     LLM
      ↓
Structured JSON
      ↓
Validation
```

**Learned:**

- Prompt engineering
- System instructions
- Structured output
- JSON responses
- Response schemas
- Output validation
- Prompt injection basics
- Context management

---

## `/embeddings`

**Concept:** Embeddings

Converts text into a numerical vector representing its semantic meaning.

```text
Text
 ↓
Embedding Model
 ↓
Vector
```

**Learned:**

- Embeddings
- Vector representations
- Semantic similarity
- Cosine similarity
- Embedding models
- Why embeddings are useful for search

---

## `/documents`

**Concept:** Vector Database

Provides access to documents stored in Supabase/PostgreSQL with support for vector data.

```text
Supabase
    ↓
PostgreSQL
    ↓
pgvector
```

**Learned:**

- Vector databases
- PostgreSQL + pgvector
- Vector storage
- Metadata
- Metadata filtering
- SQL + vector search
- Supabase
- RLS basics

---

## `/document-embeddings`

**Concept:** Document Ingestion

Generates embeddings for stored documents and saves them in the vector database.

```text
Documents
    ↓
Generate Embeddings
    ↓
Store Embeddings
    ↓
Vector Database
```

**Learned:**

- Document ingestion
- Generating embeddings for stored data
- Persisting vectors
- Connecting application data with an embedding model

---

## `/vector-search`

**Concept:** Semantic Search

Converts a user's query into an embedding and searches the vector database for semantically similar documents.

```text
User Query
    ↓
Query Embedding
    ↓
Vector Search
    ↓
Similarity
    ↓
Ranked Documents
```

**Learned:**

- Semantic search
- Cosine similarity
- Vector distance
- Top-K results
- Similarity thresholds
- Metadata filtering
- PostgreSQL functions
- Supabase `.rpc()`
- ANN concepts
- HNSW concepts
- Hybrid search
- Reranking
- Retrieval quality

---

## `/rag`

**Concept:** Retrieval-Augmented Generation

Combines semantic retrieval with an LLM to generate an answer using retrieved information as context.

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
Context + Question
      ↓
Gemini
      ↓
Grounded Answer
```

The endpoint returns both the generated answer and the documents used as sources.

**Learned:**

- RAG
- Retrieval
- Context injection
- Grounding
- Hallucinations
- Document chunking
- Reranking
- Retrieval quality
- Context limitations

---

# 🧠 Concepts Learned

This section tracks the concepts learned throughout the project.

## LLM Fundamentals

- [x] LLMs
- [x] Training vs inference
- [x] Tokens
- [x] Context windows
- [x] Parameters
- [x] Prompts
- [x] Temperature
- [x] System/user instructions
- [x] Hallucinations
- [x] LLM APIs

## Prompt Engineering

- [x] System instructions
- [x] Prompt templates
- [x] Few-shot prompting
- [x] Structured output
- [x] JSON validation
- [x] Prompt injection
- [x] Context management

## Embeddings

- [x] Embeddings
- [x] Vector representations
- [x] Semantic similarity
- [x] Cosine similarity
- [x] Embedding models

## Vector Databases

- [x] Vector storage
- [x] Similarity search
- [x] Metadata
- [x] Metadata filtering
- [x] Top-K
- [x] Similarity thresholds
- [x] PostgreSQL + pgvector
- [x] Supabase Vector
- [x] ANN
- [x] HNSW
- [x] Hybrid search
- [x] Reranking

## RAG

- [x] Document ingestion
- [x] Document chunking
- [x] Retrieval
- [x] Context injection
- [x] Grounding
- [x] Hallucinations
- [x] Retrieval quality
- [x] Context limitations

## Agents

- [ ] Tool/function calling
- [ ] AI agents
- [ ] Agent loops
- [ ] Agent state
- [ ] Memory
- [ ] Guardrails
- [ ] Human-in-the-loop

## AI Frameworks

- [ ] LangChain
- [ ] LangGraph
- [ ] OpenAI Agents SDK
- [ ] LangSmith

## AI Evaluation & Observability

- [ ] AI evaluation
- [ ] Evaluation datasets
- [ ] LLM-as-a-judge
- [ ] Tracing
- [ ] AI observability
- [ ] Prompt regression testing

## AI Security

- [ ] Prompt injection mitigation
- [ ] Tool authorization
- [ ] Data isolation
- [ ] Sensitive data protection
- [ ] Rate limiting
- [ ] AI-specific security patterns

---

# 🏗️ Current Architecture

The current implementation combines the learned concepts into a basic RAG pipeline.

```text
                         USER
                           │
                           ↓
                    User Question
                           │
                           ↓
                   Query Embedding
                           │
                           ↓
                  ┌────────────────┐
                  │   Vector DB    │
                  │   pgvector     │
                  └───────┬────────┘
                          │
                          ↓
                 Relevant Documents
                          │
                          ↓
                    Build Context
                          │
                          ↓
               Context + Question
                          │
                          ↓
                       Gemini
                          │
                          ↓
                   Grounded Answer
                          │
                          ↓
                       Sources
```

---

# 🔄 Data Flow

## Document Ingestion

```text
Documents
    ↓
Embedding Model
    ↓
Embeddings
    ↓
PostgreSQL + pgvector
```

## User Query

```text
Question
    ↓
Embedding Model
    ↓
Query Vector
    ↓
Vector Search
    ↓
Relevant Documents
```

## RAG Generation

```text
Question
    +
Retrieved Documents
    ↓
Context
    ↓
LLM
    ↓
Grounded Answer
```

---

# 🛠️ Technology Stack

```text
Frontend
├── Next.js
├── React
└── TypeScript

Backend
└── Next.js Route Handlers

AI
└── Gemini API

Database
├── Supabase
├── PostgreSQL
└── pgvector
```

---

# 📈 Learning Progress

```text
Phase 0 — LLM Fundamentals       ✅
Phase 1 — Prompt Engineering     ✅
Phase 2 — Embeddings             ✅
Phase 3 — Vector Databases       ✅
Phase 4 — RAG Theory             ✅
Phase 4 — RAG Implementation     🚧
```

### Current capabilities

```text
LLM API
   ↓
Structured Output
   ↓
Embeddings
   ↓
Vector Storage
   ↓
Semantic Search
   ↓
RAG
   ↓
Grounded Answers
```

---

# 🎯 Project Goal

The goal is not to build a production-ready AI platform immediately.

The goal is to **learn AI application development by progressively building real functionality**, understanding what each component does, and seeing how the pieces connect.

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
