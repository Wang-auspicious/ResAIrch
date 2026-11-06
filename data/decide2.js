(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "12", name: "世界模型", en: "World Models", branch: "decide",
  tagline: "学会“如果我这样做，世界会怎样变”。它是想象、规划、仿真和评测的共同底座，但“世界模型”这个词正被过度使用。",
  meters: [4, 4, 4, 4],
  leaves: ["什么是世界模型", "潜在动力学 Dreamer", "JEPA / V-JEPA", "视频世界模型", "可交互生成环境", "MPC 与规划", "想象 rollout", "动作条件生成", "物理一致性", "自动驾驶世界模型", "世界模型评测"],
  keywords: ["world model", "Dreamer", "JEPA", "Genie", "Cosmos", "世界模型"],
  overview: [
    "“世界模型”指能预测环境在动作作用下如何演化的模型。它有三种不太相同的含义：<b>强化学习中的动力学模型</b>（Dreamer、MuZero、TD-MPC：在潜空间里想象并规划）、<b>自监督预测表征</b>（LeCun 的 JEPA 路线：预测抽象表征而非像素）、<b>可交互的视频生成模型</b>（Genie、GameNGen、Cosmos：输入动作，生成下一帧画面）。",
    "2024–2025 年视频生成的进步让第三种含义成为热点：Genie 2/3 能从一张图生成可玩的 3D 环境，GameNGen 用扩散模型实时“运行” DOOM，NVIDIA Cosmos 面向自动驾驶与机器人提供世界基础模型。同时，V-JEPA 2 展示了在表征空间做规划控制真实机械臂。",
    "核心未解问题：<b>长时一致性</b>（几秒后就忘了场景）、<b>动作可控性</b>（真的按动作变化了吗）、<b>物理正确性</b>、以及<b>世界模型到底能不能用于策略评测与训练</b>。评测本身就是一个开放问题。"
  ],
  frontier: [
    ["可交互视频世界模型", "Genie、DIAMOND、GameNGen；从游戏扩展到真实世界与机器人视角。"],
    ["表征空间规划", "V-JEPA 2、DINO-WM 在预训练视觉特征上学动力学，零样本做规划。"],
    ["世界基础模型", "Cosmos 等在海量视频上预训练，面向物理 AI 微调。"],
    ["世界模型作为策略评测器", "用学到的模拟器替代昂贵的真机测试，需要验证与真实成功率的相关性。"],
    ["自动驾驶世界模型", "生成可控驾驶场景用于数据增广与闭环评测。"]
  ],
  ideas: [
    ["世界模型能可靠地评测策略吗？", "如果能用世界模型替代真机评测，机器人研究成本会骤降。但没人系统地量化它与真实成功率的相关性——这是干净且高影响的研究问题。", "在仿真中把仿真器当“真实”，训练一个视频世界模型，比较多个策略在世界模型 vs 仿真器中的成功率排序相关性。"],
    ["动作可控性的度量", "很多“世界模型”其实是视频预测器，对动作不敏感。定义并测量“动作导致的差异”，能区分真假世界模型。", "对同一起始帧输入不同动作序列，用逆动力学模型从生成视频推回动作，计算动作恢复准确率作为可控性指标。"],
    ["长时记忆与一致性", "回到看过的地方场景变了，是视频世界模型最直观的缺陷，也是通往可用模拟器的必经之路。", "在 Minecraft / 迷宫环境中设计“走开再回来”测试，评估现有模型，尝试显式空间记忆（3D 缓存）方案。"]
  ],
  prereq: {
    must: ["生成模型（05），尤其是视频扩散与自回归", "强化学习基础（10）与 MPC 思想（14）", "Dreamer 的 RSSM 结构与想象训练流程", "视频数据处理与评测（FVD、LPIPS）"],
    nice: ["3D 表示（04）用于显式记忆", "自监督学习（JEPA、DINO）", "游戏引擎或仿真器使用"]
  },
  setup: {
    data: "RL：Atari、Crafter、DMC；游戏视频与动作日志（Minecraft VPT 数据）；机器人：Open X-Embodiment、DROID；通用视频：Something-Something v2、Ego4D。",
    compute: "Dreamer / TD-MPC 单卡；Atari 尺度的扩散世界模型 1–8 卡；大规模视频世界模型数百卡以上。",
    code: "DreamerV3、TD-MPC2、DIAMOND、Cosmos、V-JEPA 2、DINO-WM 官方仓库。",
    bench: "RL 回报（Atari 100k）、视频质量 FVD/PSNR、规划成功率、动作可控性、与真实评测的相关性。",
    improve: "潜空间设计、动作条件注入方式、记忆机制、采样效率、与规划/策略学习的结合方式。",
    venue: "NeurIPS / ICLR / ICML / CVPR / CoRL"
  },
  recipe: ["明确你说的“世界模型”是哪种（动力学 / 表征 / 视频）", "在小环境（Atari / Crafter / 迷宫）快速验证", "同时报告生成质量与下游效用（规划、RL、评测）", "测试长时 rollout 与动作可控性", "扩展到真实视频或机器人数据"],
  fit: {
    yes: ["对“智能的本质”这类大问题着迷", "生成模型与 RL 都感兴趣", "能接受领域定义仍在变动"],
    no: ["算力极少又想做视频世界模型", "需要成熟的基准与清晰的 SOTA"]
  },
  trial: [
    ["Day 1–3", "读 Ha & Schmidhuber 的 World Models（交互网页版）和 DreamerV3 摘要；看 Genie / GameNGen 演示。"],
    ["Day 4–7", "跑 DreamerV3 或 DIAMOND 在一个 Atari 游戏上，看想象 rollout。"],
    ["Day 8–11", "做“动作可控性”小测试：同一起点不同动作，生成结果差多少？"],
    ["Day 12–14", "写一页：你想要的世界模型用来做什么？用途决定研究路线。"]
  ],
  classic: [
    ["World Models", "Ha, Schmidhuber", 2018, "NeurIPS", "概念普及之作。"],
    ["Learning Latent Dynamics for Planning from Pixels", "Hafner et al.", 2019, "ICML", "PlaNet / RSSM。"],
    ["Dream to Control: Learning Behaviors by Latent Imagination", "Hafner et al.", 2020, "ICLR", "Dreamer。"],
    ["Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model", "Schrittwieser et al.", 2020, "Nature", "MuZero。"],
    ["A Path Towards Autonomous Machine Intelligence", "LeCun", 2022, "OpenReview", "JEPA 路线宣言。"],
    ["TD-MPC2: Scalable, Robust World Models for Continuous Control", "Hansen, Su, Wang", 2024, "ICLR", "潜空间 MPC。"]
  ],
  recent: [
    ["Genie: Generative Interactive Environments", "Bruce et al.", 2024, "ICML", "从视频学可交互环境。"],
    ["Diffusion for World Modeling: Visual Details Matter in Atari", "Alonso et al.", 2024, "NeurIPS", "DIAMOND。"],
    ["Diffusion Models Are Real-Time Game Engines", "Valevski et al.", 2025, "ICLR", "GameNGen。"],
    ["Cosmos World Foundation Model Platform for Physical AI", "NVIDIA", 2025, "arXiv", "世界基础模型。"],
    ["V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning", "Assran et al.", 2025, "arXiv", "表征空间规划控制机械臂。"],
    ["DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning", "Zhou et al.", 2025, "ICML", "基于预训练特征的世界模型。"]
  ]
},
{
  id: "13", name: "多智能体", en: "Multi-Agent Systems", branch: "decide",
  tagline: "当世界里不止一个学习者：合作、竞争、沟通、约定。从星际争霸到 LLM 社会，核心问题始终是非平稳与信用分配。",
  meters: [3, 2, 3, 3],
  leaves: ["博弈论与纳什均衡", "MARL 与 CTDE", "值分解 QMIX", "通信与协作", "信用分配", "自博弈与种群训练", "对手建模", "人机协作 / 零样本协调", "涌现行为", "多机器人协同", "LLM 多智能体"],
  keywords: ["MARL", "multi-agent", "博弈", "self-play", "多智能体"],
  overview: [
    "多智能体系统研究多个决策者共存时的学习与交互。难点在于：对每个智能体而言，其他智能体也在学习，环境因此<b>非平稳</b>；团队只拿到共同奖励时，<b>信用分配</b>困难。<b>集中训练、分散执行</b>（CTDE）是主流范式（MADDPG、QMIX、MAPPO）。",
    "里程碑来自博弈：AlphaStar（星际争霸）、OpenAI Five（Dota 2）、Pluribus（德扑）、Cicero（外交，结合语言模型与策略推理）。这些成就依赖<b>自博弈与种群训练</b>。",
    "LLM 时代出现了新分支：<b>多 LLM 智能体协作</b>（辩论、角色分工、软件开发团队）。但研究指出很多多智能体系统的收益在算力对齐后消失，失败模式也很普遍。经典 MARL 的严谨性与 LLM 智能体的灵活性之间，存在大量可做的交叉工作。"
  ],
  frontier: [
    ["LLM 多智能体系统", "辩论、分工协作、模拟社会；以及对其有效性的严格审视（Why Do Multi-Agent LLM Systems Fail?）。"],
    ["自博弈用于 LLM", "通过自我对弈生成训练信号（SPIN、语言博弈），提升推理而无需人类数据。"],
    ["零样本协调与人机协作", "训练能与陌生伙伴（包括人类）合作的智能体（Overcooked、Hanabi）。"],
    ["JAX 加速 MARL", "JaxMARL 等让 MARL 实验快数千倍，使大规模扫参与统计严谨成为可能。"],
    ["多机器人协同", "多臂协作、编队、仓储机器人调度中的学习方法。"]
  ],
  ideas: [
    ["多 LLM 智能体真的比单智能体更好吗？", "大量论文的多智能体收益没有与同等推理算力的单智能体（多采样 + 投票）比较。做一个严格的算力对齐评估，会成为该方向的参照点。", "选 3 个多智能体框架和 4 个任务，用等 token 预算的单智能体自洽采样作对照，报告收益与失败模式。"],
    ["自博弈作为推理课程", "博弈天然产生难度自适应的课程。把它用于 LLM 推理训练，是 13 与 06 的优雅结合。", "设计一个两人零和语言博弈（如出题-解题），用小模型做自博弈 RL，测下游数学推理是否提升。"],
    ["约定（convention）的形成与迁移", "人类协作依赖约定。研究智能体如何形成、何时能迁移到新伙伴，对人机协作有直接意义。", "在 Hanabi 或 Overcooked 中训练多个种群，测量跨种群配对表现，分析约定的可解释结构。"]
  ],
  prereq: {
    must: ["强化学习（10）：PPO、Q-learning", "博弈论基础：标准型博弈、纳什均衡、零和与一般和", "CTDE 范式与 QMIX / MAPPO 的实现", "统计严谨性（MARL 方差很大）"],
    nice: ["JAX", "LLM 智能体（09）", "机制设计与社会选择"]
  },
  setup: {
    data: "环境：SMAC / SMACv2、MPE、Overcooked-AI、Hanabi、Melting Pot、Google Research Football；LLM 侧常用推理/代码基准。",
    compute: "JAX 环境单卡即可完成大量实验；StarCraft 类环境需较多 CPU。",
    code: "JaxMARL、EPyMARL、PettingZoo、MAPPO 官方、AutoGen / CAMEL（LLM 多智能体）。",
    bench: "胜率、团队回报、跨伙伴协作分数（零样本协调）、可利用性（exploitability）。",
    improve: "值分解与信用分配、通信机制、种群多样性、对手建模、LLM 角色与协议设计。",
    venue: "AAMAS / NeurIPS / ICML / ICLR；IJCAI / AAAI"
  },
  recipe: ["选环境并复现基线（MAPPO 常是强基线）", "定义问题（协作/竞争/通信）", "提出方法，强调对非平稳或信用分配的处理", "多种子 + 跨伙伴测试", "分析涌现行为"],
  fit: {
    yes: ["对博弈、社会、协作现象感兴趣", "喜欢小而快的实验", "想做 LLM 智能体但希望有更扎实的理论"],
    no: ["只想做单一大模型能力提升"]
  },
  trial: [
    ["Day 1–3", "复习博弈论基础；读 MAPPO 与 QMIX。"],
    ["Day 4–7", "用 JaxMARL 在 MPE 和 Overcooked 上跑 MAPPO，感受速度。"],
    ["Day 8–11", "做一个零样本协调测试：不同种子训练的智能体互相配对。"],
    ["Day 12–14", "用两个 LLM 做一次辩论实验，与单模型多采样投票对比。"]
  ],
  classic: [
    ["Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments", "Lowe et al.", 2017, "NeurIPS", "MADDPG。"],
    ["Counterfactual Multi-Agent Policy Gradients", "Foerster et al.", 2018, "AAAI", "COMA 信用分配。"],
    ["QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning", "Rashid et al.", 2018, "ICML", "值分解。"],
    ["Grandmaster level in StarCraft II using multi-agent reinforcement learning", "Vinyals et al.", 2019, "Nature", "AlphaStar。"],
    ["Emergent Tool Use From Multi-Agent Autocurricula", "Baker et al.", 2020, "ICLR", "捉迷藏涌现。"],
    ["The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games", "Yu et al.", 2022, "NeurIPS", "MAPPO。"]
  ],
  recent: [
    ["Human-level play in the game of Diplomacy by combining language models with strategic reasoning", "Meta FAIR Diplomacy Team", 2022, "Science", "Cicero。"],
    ["AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation", "Wu et al.", 2023, "arXiv", "LLM 多智能体框架。"],
    ["Improving Factuality and Reasoning in Language Models through Multiagent Debate", "Du et al.", 2024, "ICML", "多智能体辩论。"],
    ["Self-Play Fine-Tuning Converts Weak Language Models to Strong Language Models", "Chen et al.", 2024, "ICML", "SPIN。"],
    ["JaxMARL: Multi-Agent RL Environments and Algorithms in JAX", "Rutherford et al.", 2024, "NeurIPS D&B", "加速工具。"],
    ["Why Do Multi-Agent LLM Systems Fail?", "Cemri et al.", 2025, "arXiv", "失败分类学。"]
  ]
}
);
