---
permalink: /
title: ""
excerpt: ""
author_profile: true
stylesheets:
  - /assets/css/home.css
redirect_from:
  - /about/
  - /about.html
---

<span class="anchor" id="about-me"></span>

<h1 class="main-heading">Hi there <img src="images/Hi.gif" width="40px" alt=""> Welcome to my Homepage!</h1>

I am a master's student in Software Engineering at Jilin University and a research assistant at the Trust & Application AI Lab (TAI Lab), HKUST(GZ). My research focuses on trustworthy large language model systems, with recent work on LLM router security, black-box model fingerprinting, post-training data extraction from diffusion language models, and realistic benchmarks for protein modeling.

Feel free to reach out if you are interested in collaboration or potential research opportunities.

News
---------------
<div class="news-box">
  <ul class="news-list">
    <li><span class="news-date"><em>2026.04</em></span> R<sup>2</sup>A was accepted to ACL 2026 Main Conference and released on arXiv.</li>
    <li><span class="news-date"><em>2026.03</em></span> Protap, a benchmark for realistic protein modeling applications, was updated on arXiv.</li>
    <li><span class="news-date"><em>2025.05</em></span> DuFFin was released on arXiv.</li>
    <li><span class="news-date"><em>2024.09</em></span> I joined TAI Lab at HKUST(GZ) as a research assistant.</li>
  </ul>
</div>

Experience
--------------
<div class="experience-container">
  <div class="experience-card">
    <img src="images/logos/hkust-gz-logo.svg" alt="HKUST(GZ) logo" class="experience-logo">
    <div class="experience-info">
      <strong>Trust & Application AI Lab, HKUST(GZ)</strong><br>
      <em>2024.09 - Present</em><br>
      Research Assistant at <a href="https://enyandai.github.io/"><em>TAI Lab</em></a>, led by Prof. Enyan Dai.<br>
      <span style="color:#888;">Research on emerging threats in LLM services, including model IP protection and LLM router security.</span>
    </div>
  </div>

  <div class="experience-card">
    <img src="images/logos/jlu-logo.svg" alt="Jilin University logo" class="experience-logo">
    <div class="experience-info">
      <strong>Jilin University</strong><br>
      <em>2024.09 - 2027.09</em><br>
      M.S. in Software Engineering, recommended admission.<br>
      <span style="color:#888;">Graduate research on trustworthy AI systems and LLM security.</span>
    </div>
  </div>

  <div class="experience-card">
    <img src="images/logos/jlu-logo.svg" alt="Jilin University logo" class="experience-logo">
    <div class="experience-info">
      <strong>Jilin University</strong><br>
      <em>2020.09 - 2024.09</em><br>
      B.E. in Software Engineering.<br>
      <span style="color:#888;">Undergraduate training in software engineering and AI systems.</span>
    </div>
  </div>
</div>

Publications
--------------
<div class="pub-button-container">
  <button class="pub-button active" onclick="filterPublications(event, 'all')">Core Publications</button>
  <button class="pub-button" onclick="filterPublications(event, 'list')">Full Publications List</button>
</div>

(* equal contribution · &dagger; corresponding author · &Dagger; project leader)

<div id="core-publications" class="publication-view" data-publication-view="core">
  <div class="publication-card featured" data-category="all">
    <div style="display: flex; align-items: center;">
      <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
        <img src="images/papers/r2a.png" alt="R2A paper thumbnail" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
      </div>
      <div>
        <strong>Route to Rome Attack: Directing LLM Routers to Expensive Models via Adversarial Suffix Optimization</strong><br>
        <i style="font-size: 13px;"><strong>Haochun Tang</strong>, Yuliang Yan, Jiahua Lu, Huaxiao Liu, Enyan Dai</i><br>
        We propose R<sup>2</sup>A, a black-box attack that learns a hybrid ensemble surrogate router from route feedback and optimizes adversarial suffixes to steer requests toward expensive high-capability models.
        <br>
        <b><i style="color:#83a1c7;">ACL 2026 Main &nbsp;</i></b>
        <a href="https://arxiv.org/abs/2604.15022"><em>[arXiv]</em></a>
        <a href="files/r2a.pdf"><em>[PDF]</em></a>
        <a href="https://github.com/thcxiker/R2A-Attack"><em>[code]</em></a>
      </div>
    </div>
  </div>

  <div class="publication-card" data-category="all">
    <div style="display: flex; align-items: center;">
      <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
        <img src="images/papers/duffin.png" alt="DuFFin paper thumbnail" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
      </div>
      <div>
        <strong>DuFFin: A Dual-Level Fingerprinting Framework for LLMs IP Protection</strong><br>
        <i style="font-size: 13px;">Yuliang Yan, <strong>Haochun Tang</strong>, Shuo Yan, Enyan Dai</i><br>
        DuFFin verifies LLM ownership in black-box settings through trigger-response and knowledge-level fingerprints, remaining effective under fine-tuning, quantization, and safety alignment.
        <br>
        <b><i style="color:#83a1c7;">EACL 2026 &nbsp;</i></b>
        <a href="https://arxiv.org/abs/2505.16530"><em>[arXiv]</em></a>
        <a href="files/duffin.pdf"><em>[PDF]</em></a>
        <a href="https://github.com/yuliangyan0807/llm-fingerprint"><em>[code]</em></a>
      </div>
    </div>
  </div>

  <div class="publication-card" data-category="all">
    <div style="display: flex; align-items: center;">
      <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
        <img src="images/papers/protap.png" alt="Protap paper thumbnail" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
      </div>
      <div>
        <strong>General Protein Pretraining or Domain-Specific Designs? Benchmarking Protein Modeling on Realistic Applications</strong><br>
        <i style="font-size: 13px;">Shuo Yan, Yuliang Yan, Bin Ma, Chenao Li, <strong>Haochun Tang</strong>, Jiahua Lu, Minhua Lin, Yuyuan Feng, Enyan Dai</i><br>
        Protap systematically compares general pretraining and domain-specific protein modeling designs on realistic downstream applications.
        <br>
        <b><i style="color:#83a1c7;">KDD 2026 &nbsp;</i></b>
        <a href="https://arxiv.org/abs/2506.02052"><em>[arXiv]</em></a>
        <a href="files/protap.pdf"><em>[PDF]</em></a>
        <a href="https://github.com/Trust-App-AI-Lab/protap"><em>[code]</em></a>
      </div>
    </div>
  </div>

  <div class="publication-card" data-category="all">
    <div style="display: flex; align-items: center;">
      <div>
        <strong>D-Miner: Extracting Post-Training Data from Diffusion Language Models</strong><br>
        <i style="font-size: 13px;"><strong>Haochun Tang</strong></i><br>
        D-Miner starts from pure mask inputs, identifies member-like candidates through reconstruction signals, converts the signal into hidden-state guidance, and steers denoising toward post-training data regions.
        <br>
        <b><i style="color:#83a1c7;">Under Review &nbsp;</i></b>
      </div>
    </div>
  </div>
</div>

<div id="full-publications" class="publication-view" data-publication-view="list" hidden>
  <ul class="full-publication-list">
    <li>
      <span class="pub-list-badge">ACL 2026</span>
      <span class="pub-list-title">Route to Rome Attack: Directing LLM Routers to Expensive Models via Adversarial Suffix Optimization</span><br>
      <span class="pub-list-authors"><strong>Haochun Tang</strong>, Yuliang Yan, Jiahua Lu, Huaxiao Liu, Enyan Dai.</span>
      <span class="pub-list-note">Main Conference.</span>
      <span class="pub-list-links"><a href="https://arxiv.org/abs/2604.15022">[arXiv]</a><a href="files/r2a.pdf">[PDF]</a><a href="https://github.com/thcxiker/R2A-Attack">[code]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">EACL 2026</span>
      <span class="pub-list-title">DuFFin: A Dual-Level Fingerprinting Framework for LLMs IP Protection</span><br>
      <span class="pub-list-authors">Yuliang Yan, <strong>Haochun Tang</strong>, Shuo Yan, Enyan Dai.</span>
      <span class="pub-list-links"><a href="https://arxiv.org/abs/2505.16530">[arXiv]</a><a href="files/duffin.pdf">[PDF]</a><a href="https://github.com/yuliangyan0807/llm-fingerprint">[code]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">KDD 2026</span>
      <span class="pub-list-title">General Protein Pretraining or Domain-Specific Designs? Benchmarking Protein Modeling on Realistic Applications</span><br>
      <span class="pub-list-authors">Shuo Yan, Yuliang Yan, Bin Ma, Chenao Li, <strong>Haochun Tang</strong>, Jiahua Lu, Minhua Lin, Yuyuan Feng, Enyan Dai.</span>
      <span class="pub-list-links"><a href="https://arxiv.org/abs/2506.02052">[arXiv]</a><a href="files/protap.pdf">[PDF]</a><a href="https://github.com/Trust-App-AI-Lab/protap">[code]</a></span>
    </li>
    <li>
      <span class="pub-list-badge">Under Review</span>
      <span class="pub-list-title">D-Miner: Extracting Post-Training Data from Diffusion Language Models</span><br>
      <span class="pub-list-authors"><strong>Haochun Tang</strong>.</span>
    </li>
  </ul>
</div>

<script src="assets/js/show_publications.js"></script>
<script src="assets/js/pub_media_rotator.js"></script>

Projects
--------
<div class="project-card" data-category="project">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/projects/studyclawhub.png" alt="StudyClawHub project thumbnail" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>StudyClawHub</strong><br>
      I participate in the development and maintenance of <a href="https://trust-app-ai-lab.github.io/StudyClawHub/"><em>StudyClawHub</em></a>, an AI Agent and Skill ecosystem for students. The platform supports reusable agent browsing, task skill installation, custom skill submission, and GitHub-driven community publishing.
      <br>
      <b><i style="color:#83a1c7;">Platform Development &nbsp;</i></b>
      <a href="https://trust-app-ai-lab.github.io/StudyClawHub/"><em>[project]</em></a>
    </div>
  </div>
</div>

<div class="project-card" data-category="project">
  <div style="display: flex; align-items: center;">
    <div class="pub-media-rotator" data-interval="4000" style="position: relative; width: 320px; height: 180px; margin-right: 20px; border-radius: 8px; overflow: hidden; flex: 0 0 auto;">
      <img src="images/logos/hkust-gz-logo.svg" alt="HKUST(GZ) project thumbnail" style="width: 320px; height: 180px; object-fit: contain; display: block; margin: 0 auto;">
    </div>
    <div>
      <strong>Multimodal Large Model for Integrated Traditional Chinese and Western Medicine</strong><br>
      I contributed to a national major science and technology project proposal, including technical route refinement, multimodal data fusion planning, severe-disease early-warning modeling, and clinical validation design. The project has been approved.
      <br>
      <b><i style="color:#83a1c7;">National Project Proposal &nbsp;</i></b>
    </div>
  </div>
</div>
