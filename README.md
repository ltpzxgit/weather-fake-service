🌦️ Weather Service – End-to-End CI/CD & GitOps Project

✅ Personal DevOps Portfolio Project
✅ Designed to demonstrate real-world CI/CD, GitOps, and Kubernetes workflow

📌 Project Summary (TL;DR for HR)

This project demonstrates a complete CI/CD + GitOps pipeline where:

Application source code changes automatically trigger:

Docker image build & push (via Jenkins)

Kubernetes manifest update (GitOps)

Automatic deployment to Kubernetes (via Argo CD)

✅ No manual deployment
✅ Git as the single source of truth
✅ Production-like workflow

🧠 Why This Project?

I built this project to practice real DevOps problems, not just follow tutorials.

The focus is on:

CI/CD automation

Image versioning

GitOps workflow

Kubernetes deployment & rollout

Debugging real-world pipeline issues

The weather API itself is intentionally simple (fake data)
so the focus stays on infrastructure & delivery, not application logic.

🏗️ Architecture Overview
Developer (git push)
      |
      v
Jenkins CI
  - npm test
  - docker build
  - docker push
  - update manifests repo
      |
      v
GitHub (Manifests Repo)
      |
      v
Argo CD (Auto Sync)
      |
      v
Kubernetes (k3s on AWS EC2)
      |
      v
Weather Service Pod


📎 (architecture image in /diagram folder)

🛠 Tech Stack
Layer	Technology
Application	Node.js
CI	Jenkins
Container	Docker
Orchestration	Kubernetes (k3s)
GitOps	Argo CD
Cloud	AWS EC2 (Ubuntu)
Registry	Docker Hub
Version Control	GitHub
📦 Repositories
🧩 Application Repo

Node.js weather API

Dockerized application

Jenkinsfile for CI

🧩 Manifests Repo

Kubernetes Deployment & Service

Used as GitOps source by Argo CD

🔁 CI/CD & GitOps Flow (Detailed)
1️⃣ Code Push
git commit && git push

2️⃣ Jenkins CI Pipeline

Jenkins automatically:

Runs npm install & tests

Builds Docker image

Tags image with git commit hash

Pushes image to Docker Hub

Updates Kubernetes manifest repo

✅ No hardcoded credentials
✅ Uses Jenkins Credentials Store

3️⃣ GitOps Deployment (Argo CD)

Argo CD continuously watches the manifests repository.

When Jenkins updates the image tag:

Argo CD detects change

Automatically syncs cluster state

Performs rolling update

✅ Automated Sync
✅ Self-healing
✅ Prune unused resources

🚀 Deployment Strategy

Kubernetes Deployment

Rolling update (zero downtime)

Health checks:

readinessProbe

livenessProbe

✅ Example API
curl http://<EC2_PUBLIC_IP>:30080/weather?city=bangkok


Example response:

{
  "city": "bangkok",
  "temperature": 30,
  "condition": "Cloudy",
  "build": "c410876"
}

🐞 Real Problems Faced & Solutions
Problem	What I Learned
Jenkins Groovy errors	Variable scope & pipeline context
Docker permission denied	Docker socket permission & container security
npm not found in CI	Runtime dependencies in CI containers
Image tag mismatch	Git-based versioning strategy
YAML deployment failure	Strict YAML indentation rules
Git branch errors	CI consistency between repos

These issues were solved incrementally, similar to real production environments.

🔒 Security Considerations

No credentials stored in code

Used Jenkins Credentials Store

Docker Hub & GitHub PAT tokens

GitOps prevents manual cluster drift

📈 Future Improvements

Ingress + HTTPS

Jenkins webhook trigger

Separate dev / prod environments

Monitoring (Prometheus / Grafana)

Image scanning & security checks

👤 Author

Name: Lattapon
Focus: DevOps / Cloud / Kubernetes
Interest: CI/CD, GitOps, Cloud Infrastructure

✅ Key Takeaway

This project demonstrates:

✅ End-to-end CI/CD pipeline

✅ GitOps deployment model

✅ Real debugging experience

✅ Production-style DevOps mindset
