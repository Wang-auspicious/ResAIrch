(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "10", name: "强化学习", en: "Reinforcement Learning", branch: "decide",
  tagline: "从试错中学习决策。曾因样本低效被冷落，如今是大模型推理与机器人控制的共同引擎。",
  meters: [4, 2, 4, 4],
  leaves: ["MDP 与 Bellman 方程", "Q-learning / DQN", "策略梯度 / PPO", "Actor-Critic / SAC", "探索与内在奖励", "离线 RL", "基于模型的 RL", "目标条件 / 分层 RL", "价值分布 RL", "安全 RL", "RL for LLM", "扩散策略的 RL 微调"],
  keywords: ["RL", "PPO", "SAC", "DQN", "offline", "强化"],
  overview: [
    "强化学习研究智能体如何通过与环境交互、最大化累计奖励来学习策略。两大家族：<b>基于价值</b>（Q-learning → DQN 在 Atari 达到人类水平）和<b>基于策略</b>（REINFORCE → TRPO/PPO），以及两者结合的 <b>Actor-Critic</b>（SAC 是连续控制的默认方法）。AlphaGo/AlphaZero/MuZero 展示了 RL + 搜索的威力。",
    "RL 一度因样本效率低、难调、难复现而降温，但近年在两个场景爆发：<b>大规模 GPU 仿真</b>让机器人运动控制（17、20）几乎完全由 RL 训练；<b>LLM 后训练</b>（RLHF → RLVR/GRPO）让 RL 成为推理能力的来源。",
    "当前学术前沿：<b>离线 RL 与离线到在线</b>、<b>RL 的规模化</b>（网络能否像监督学习一样越大越好）、<b>世界模型 RL</b>（DreamerV3）、<b>扩散/流策略的 RL 微调</b>，以及把经典 RL 问题（信用分配、探索）带回到 LLM 场景。"
  ],
  frontier: [
    ["RL for LLM", "GRPO、PPO 变体在数学/代码/智能体任务上的应用；价值函数是否必要、优势估计、KL 约束等经典问题重新变得重要。"],
    ["价值网络的规模化", "SimBa、BRO、分类式价值损失（HL-Gauss）等让 RL 网络可以变大、变深而不崩溃。"],
    ["离线与目标条件 RL", "OGBench 等新基准推动离线目标条件 RL；离线预训练 + 在线微调是机器人的现实路线。"],
    ["扩散策略的 RL 微调", "DPPO 等让模仿学习得到的扩散策略通过 RL 继续提升，连接 11 与 10。"],
    ["世界模型 RL", "DreamerV3 用同一套超参解决大量任务（Nature 2025），模型式方法回归。"]
  ],
  ideas: [
    ["LLM 时代的信用分配", "多轮智能体任务只有最终奖励，GRPO 把整条轨迹同等对待。把经典 RL 的信用分配思想（TD、优势分解）迁移过来，是有深度又有现实需求的问题。", "在一个多步工具调用环境中，比较轨迹级奖励、步级过程奖励与学习的价值函数三种优势估计，测样本效率。"],
    ["RL 网络规模化的规律", "监督学习有 scaling law，RL 还没有可靠的版本。哪怕在 MuJoCo/DMC 上建立“参数量 × 回放比 × 数据量”的规律都很有价值。", "用 JAX 并行环境在 DMC 上扫 5 个网络规模 × 3 个更新比，拟合性能曲线，检验是否存在算力最优配比。"],
    ["基准卫生与可复现性", "RL 的结果对种子、实现细节极其敏感。做一件把领域结论“去伪存真”的事——严格重测热门方法——非常有品味。", "用 rliable 的 IQM + 分层 bootstrap 重测 5 个近年离线 RL 方法，看排名是否保持。"]
  ],
  prereq: {
    must: ["MDP、Bellman 方程、动态规划、TD 学习（Sutton & Barto 前 6 章）", "策略梯度定理、PPO 的裁剪目标、GAE", "DQN 与 SAC 的实现细节（目标网络、回放、熵正则）", "能独立实现并调通 PPO（建议从 CleanRL 单文件开始）", "统计严谨性：多种子、置信区间（23）"],
    nice: ["JAX（PureJaxRL 让实验快 1000 倍）", "控制理论（14）", "博弈论（13）", "LLM 后训练框架（06）"]
  },
  setup: {
    data: "环境：Gymnasium / MuJoCo、DeepMind Control Suite、Atari 100k、Procgen、Crafter；离线 D4RL（已被 Minari 接管）、OGBench；GPU 仿真 Isaac Lab、Brax、MuJoCo Playground。",
    compute: "MuJoCo 任务单卡/CPU 数小时；JAX 并行环境单卡分钟级完成大量种子；Atari 全套与大规模实验需多卡。",
    code: "CleanRL、Stable-Baselines3、PureJaxRL、JaxMARL、TorchRL、verl（LLM RL）。",
    bench: "回报与样本效率曲线；IQM、最优性差距（rliable）；离线 RL 的归一化分数；成功率。",
    improve: "目标函数（裁剪/正则）、网络架构与归一化、探索策略、数据复用比、价值估计（分布式/分类式）、表征学习辅助任务。",
    venue: "NeurIPS / ICML / ICLR、RLC（Reinforcement Learning Conference）、CoRL（机器人方向）"
  },
  recipe: ["在多个环境上复现基线（至少 5 种子）", "提出算法改动并给出动机（理论或诊断实验）", "跨多个任务套件评测（DMC + MuJoCo + Atari 中至少两个）", "用 IQM + 置信区间报告，避免挑环境", "消融与超参敏感性分析"],
  fit: {
    yes: ["喜欢算法与数学，又能调试很不稳定的系统", "对决策、控制、推理都有兴趣", "愿意花时间在复现上"],
    no: ["难以忍受“改一个种子结果就变了”", "希望快速看到明显效果"]
  },
  trial: [
    ["Day 1–3", "读 Sutton & Barto 第 3–6 章与 Spinning Up 教程；在 CartPole 上手写 REINFORCE。"],
    ["Day 4–7", "逐行读 CleanRL 的 ppo_continuous_action.py，跑 HalfCheetah，理解每个技巧（The 37 Implementation Details of PPO）。"],
    ["Day 8–11", "跑 SAC 并与 PPO 比较样本效率；用 5 个种子画置信带。"],
    ["Day 12–14", "试 PureJaxRL 体会速度差距；判断你更想走机器人 RL 还是 LLM RL。"]
  ],
  classic: [
    ["Reinforcement Learning: An Introduction (2nd ed.)", "Sutton, Barto", 2018, "MIT Press", "必读教材。"],
    ["Human-level control through deep reinforcement learning", "Mnih et al.", 2015, "Nature", "DQN。"],
    ["Trust Region Policy Optimization", "Schulman et al.", 2015, "ICML", "TRPO。"],
    ["Mastering the game of Go with deep neural networks and tree search", "Silver et al.", 2016, "Nature", "AlphaGo。"],
    ["Proximal Policy Optimization Algorithms", "Schulman et al.", 2017, "arXiv", "PPO。"],
    ["Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor", "Haarnoja et al.", 2018, "ICML", "SAC。"],
    ["Conservative Q-Learning for Offline Reinforcement Learning", "Kumar et al.", 2020, "NeurIPS", "CQL。"],
    ["Deep Reinforcement Learning at the Edge of the Statistical Precipice", "Agarwal et al.", 2021, "NeurIPS", "评测方法论。"]
  ],
  recent: [
    ["Stop Regressing: Training Value Functions via Classification for Scalable Deep RL", "Farebrother et al.", 2024, "ICML", "分类式价值损失。"],
    ["SimBa: Simplicity Bias for Scaling Up Parameters in Deep Reinforcement Learning", "Lee et al.", 2025, "ICLR", "RL 网络规模化。"],
    ["OGBench: Benchmarking Offline Goal-Conditioned RL", "Park et al.", 2025, "ICLR", "离线目标条件基准。"],
    ["Diffusion Policy Policy Optimization", "Ren et al.", 2025, "ICLR", "DPPO：扩散策略 RL 微调。"],
    ["Mastering diverse control tasks through world models", "Hafner et al.", 2025, "Nature", "DreamerV3。"],
    ["DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models", "Shao et al.", 2024, "arXiv", "GRPO，RL 进入 LLM 主线。"]
  ]
},
{
  id: "11", name: "模仿学习", en: "Imitation Learning", branch: "decide",
  tagline: "从演示中学会动作。数据采集方式决定上限——今天机器人能力的提升，一大半来自更好的演示数据与动作表示。",
  meters: [2, 2, 4, 5],
  leaves: ["行为克隆 BC", "协变量偏移 / DAgger", "逆强化学习 IRL", "动作分块 Action Chunking", "多模态动作分布", "Diffusion / Flow Policy", "ACT / ALOHA", "遥操作与数据采集", "从人类视频学习", "数据质量与规模定律", "跨本体模仿"],
  keywords: ["imitation", "behavior cloning", "diffusion policy", "ACT", "演示", "模仿"],
  overview: [
    "模仿学习从专家演示中学习策略。最简单的<b>行为克隆</b>（BC）就是监督学习：观测 → 动作。它的经典问题是<b>协变量偏移</b>——小误差把机器人带到训练中没见过的状态，误差累积（DAgger 用在线纠正缓解）。另一条路线是<b>逆强化学习</b>：先推断奖励再优化。",
    "2023 年两项工作改变了格局：<b>Diffusion Policy</b> 用扩散模型表示多模态动作分布，<b>ACT</b> 用 Transformer 预测动作块（action chunking）并配合低成本双臂硬件 ALOHA。两者都说明：<b>动作表示</b>（分块、多模态）和<b>高质量演示</b>比算法花样重要得多。",
    "当前方向：<b>数据规模化</b>（Open X-Embodiment、DROID）、<b>低成本采集</b>（UMI 手持夹爪、外骨骼、VR 遥操作）、<b>从人类视频学习</b>、<b>数据质量</b>（哪些演示有害）、以及作为 VLA（21）的动作头。模仿学习是进入机器人学习最快的入口。"
  ],
  frontier: [
    ["扩散 / 流策略", "成为默认动作头；研究焦点是推理速度（一致性蒸馏、流匹配少步）与 RL 微调。"],
    ["动作 tokenization", "FAST 用 DCT 压缩动作序列，让自回归 VLA 能高效建模高频动作。"],
    ["数据采集革新", "UMI（手持夹爪 + 鱼眼相机）、HumanPlus（人体动捕遥操作）、移动 ALOHA；降低每条演示成本。"],
    ["数据规模定律", "研究表明泛化主要取决于环境与物体的多样性，而不是单环境的演示数量。"],
    ["从人类视频与跨本体学习", "利用海量人类视频补足机器人数据稀缺，需要处理形态差异。"]
  ],
  ideas: [
    ["哪些演示是有害的？", "演示质量参差（犹豫、失败重试、不同操作者风格）。自动识别并加权/剔除有害演示，是低算力、高实用价值的问题。", "在 RoboMimic 的多质量人类数据上，用影响函数或策略不确定性给每条演示打分，比较剔除前后成功率。"],
    ["失败恢复数据的自动生成", "BC 策略最大的弱点是遇到偏差不会恢复。如果能自动合成“偏离-恢复”演示，就能低成本缓解协变量偏移。", "在仿真中对演示轨迹施加扰动并用规划器生成恢复片段，训练 Diffusion Policy，测扰动下成功率。"],
    ["动作表示的系统对比", "动作空间（关节/末端、绝对/增量、块长度、频率）选择众说纷纭，常被当成超参随便定。系统性对比能成为社区参考。", "在 LIBERO 和真实 SO-101 上固定策略结构，系统扫描动作空间与 chunk 长度，报告成功率与平滑度。"]
  ],
  prereq: {
    must: ["02 深度学习基础与 05 扩散模型基础", "行为克隆、DAgger、协变量偏移的原理", "Diffusion Policy 与 ACT 的结构与训练流程", "机器人基本概念：关节空间 vs 末端位姿、控制频率（14）", "LeRobot 或 robomimic 框架使用"],
    nice: ["真实机器人操作经验（低成本机械臂即可）", "强化学习（10）", "3D 视觉（点云策略如 DP3）"]
  },
  setup: {
    data: "仿真：Push-T、RoboMimic、LIBERO、ManiSkill；真实：ALOHA 类任务通常每任务 50–200 条演示；大规模 Open X-Embodiment（100 万+ 轨迹）、DROID（7.6 万轨迹）。",
    compute: "单任务 Diffusion Policy / ACT：1 张 RTX 4090 数小时到 1 天；多任务大模型需多卡。",
    code: "LeRobot（HuggingFace，含数据集与低成本硬件支持）、diffusion_policy、robomimic、ACT 官方仓库。",
    bench: "成功率（真实机器人通常每设置 ≥20 次试验）、完成时间、对扰动/新物体的泛化。",
    improve: "动作表示与分块、策略结构（扩散/流/自回归）、观测（多视角、点云、触觉）、数据采集与清洗、推理加速。",
    venue: "CoRL / RSS / ICRA / IROS；NeurIPS / ICLR（偏方法）"
  },
  recipe: ["在仿真基准上复现基线（Diffusion Policy / ACT）", "针对一个明确弱点（泛化/恢复/速度）设计方法", "仿真多任务定量评测", "真实机器人验证（有视频）", "开源代码与数据"],
  fit: {
    yes: ["想最快进入机器人学习", "喜欢动手、能接受采集数据的体力活", "有或能获得一台低成本机械臂"],
    no: ["完全不想碰硬件", "期望理论上的优雅"]
  },
  trial: [
    ["Day 1–3", "读 Diffusion Policy 与 ACT；跑 LeRobot 的 Push-T 示例训练与评测。"],
    ["Day 4–7", "在 LIBERO 一个任务套件上训练 Diffusion Policy 与 ACT，比较成功率。"],
    ["Day 8–11", "改一个变量（演示数量、chunk 长度、观测视角），画成功率曲线。"],
    ["Day 12–14", "若条件允许，组装 SO-101（成本约数百美元）采 30 条真实演示跑通；否则在仿真中加扰动测试鲁棒性。"]
  ],
  classic: [
    ["ALVINN: An Autonomous Land Vehicle in a Neural Network", "Pomerleau", 1989, "NeurIPS", "行为克隆的起点。"],
    ["Algorithms for Inverse Reinforcement Learning", "Ng, Russell", 2000, "ICML", "IRL。"],
    ["A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning", "Ross, Gordon, Bagnell", 2011, "AISTATS", "DAgger。"],
    ["Generative Adversarial Imitation Learning", "Ho, Ermon", 2016, "NeurIPS", "GAIL。"],
    ["What Matters in Learning from Offline Human Demonstrations for Robot Manipulation", "Mandlekar et al.", 2021, "CoRL", "robomimic 实证研究。"],
    ["Implicit Behavioral Cloning", "Florence et al.", 2021, "CoRL", "能量模型表示多模态动作。"]
  ],
  recent: [
    ["Diffusion Policy: Visuomotor Policy Learning via Action Diffusion", "Chi et al.", 2023, "RSS", "扩散动作头。"],
    ["Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware", "Zhao et al.", 2023, "RSS", "ACT + ALOHA。"],
    ["Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots", "Chi et al.", 2024, "RSS", "UMI 手持采集。"],
    ["Mobile ALOHA: Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation", "Fu, Zhao, Finn", 2024, "CoRL", "移动双臂。"],
    ["Data Scaling Laws in Imitation Learning for Robotic Manipulation", "Lin et al.", 2025, "ICLR", "多样性 > 数量。"],
    ["FAST: Efficient Action Tokenization for Vision-Language-Action Models", "Pertsch et al.", 2025, "arXiv", "动作压缩。"]
  ]
}
);
