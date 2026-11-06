(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "20", name: "人形机器人", en: "Humanoid Robots", branch: "robot",
  tagline: "最难也最受关注的形态：全身几十个自由度、随时会摔、要像人一样动。2024–2026 年进展是指数级的。",
  meters: [4, 3, 5, 5],
  leaves: ["人形本体与硬件平台", "双足行走 RL", "全身控制 WBC", "动作重定向 Retargeting", "动作模仿 Motion Imitation", "通用动作跟踪", "遥操作与数据采集", "人形 Loco-manipulation", "sim-to-real", "人体运动数据 AMASS", "人形基础模型"],
  keywords: ["humanoid", "人形", "whole-body", "G1", "H1", "动作模仿"],
  overview: [
    "人形机器人研究有两条源流：<b>机器人学</b>的双足控制（ZMP、WBC、MPC，Atlas 是代表）和<b>图形学</b>的物理角色动画（DeepMimic、AMP：在仿真中模仿动捕数据）。2023 年后两者融合：用图形学的动作模仿方法 + 机器人学的 sim-to-real 技巧，在真实人形上复现人类动作。",
    "商用平台（Unitree H1/G1、Booster、Fourier 等）让大量实验室有了人形。代表进展：Berkeley 的 RL 行走（Science Robotics 2024）；H2O / OmniH2O / HumanPlus 的实时全身遥操作；ExBody 系列的表现性动作；ASAP 用 real-to-sim 对齐物理实现敏捷动作；BeyondMimic 等<b>通用动作跟踪器</b>能跟踪几乎任意人类动作。",
    "当前主题：<b>通用运动控制器</b>（作为上层策略的“运动 API”）、<b>全身操作</b>（搬运、开门、使用工具）、<b>从人类视频学习</b>、<b>人形基础模型</b>（GR00T N1 等）。"
  ],
  frontier: [
    ["通用动作跟踪", "训练一个策略跟踪大规模人类动作库中的任意动作，作为下游任务的底层控制器。"],
    ["物理对齐的敏捷技能", "ASAP 等通过 real2sim 修正动力学差异，实现跳跃、踢腿等高动态动作。"],
    ["遥操作与数据", "动捕/VR/外骨骼全身遥操作采集人形操作数据。"],
    ["人形 VLA / 基础模型", "GR00T N1 等双系统结构：VLM 负责理解，扩散/流动作头负责全身控制。"],
    ["接触丰富的全身交互", "坐下、爬起、搬重物、与环境多点接触。"]
  ],
  ideas: [
    ["通用跟踪器作为“运动 API”", "如果底层跟踪器足够可靠，上层（VLA、规划器）只需输出人体动作即可控制人形，这是清晰的分层。关键是定义接口与鲁棒性。", "在 Isaac Lab 中训练一个 AMASS 动作跟踪器，用文本生成动作模型（如 MDM）输出动作，测“文本→人形动作”的成功率与失败类型。"],
    ["人类视频→人形技能的物理可行性度量", "从视频估计的人体动作常违反物理（穿地、滑步）。在重定向前判断并修复不可行动作，能显著提高数据利用率。", "定义物理可行性指标（接触一致性、支撑多边形、关节极限），筛选/修复视频动作，比较跟踪成功率。"],
    ["倒地与恢复", "真实部署中摔倒不可避免，自主起身与安全倒地是被低估的实用问题。", "在仿真中训练多姿态起身策略，系统测试不同倒地姿态下的成功率并真机验证。"]
  ],
  prereq: {
    must: ["17 腿式运动的 RL 与 sim-to-real 流程", "04 中 SMPL 人体模型与动作数据格式", "动作重定向（人体→机器人关节）", "Isaac Gym / Isaac Lab 与 PPO", "14 中的动力学与 PD 控制"],
    nice: ["物理角色动画（DeepMimic、AMP、PHC）", "动捕设备与人体姿态估计", "真实人形部署经验与安全规范"]
  },
  setup: {
    data: "AMASS（约 40+ 小时动捕）、LAFAN1、从视频估计的人体动作；遥操作数据自采。",
    compute: "跟踪/行走策略：单张 RTX 4090 一天内；大规模通用跟踪器需多卡；人形 VLA 需多卡。",
    code: "Isaac Lab、HumanoidVerse、PHC、unitree_rl_gym、ASAP / OmniH2O 官方仓库。",
    bench: "跟踪误差 MPJPE、成功率、摔倒率、真实部署的动作质量与视频。",
    improve: "重定向质量、奖励与课程、物理对齐（real2sim）、观测设计、分层结构与接口。",
    venue: "CoRL / RSS / ICRA / IROS / Humanoids；SIGGRAPH（角色动画）；Science Robotics"
  },
  recipe: ["选平台（G1/H1）与动作数据", "重定向并过滤动作", "仿真训练（教师-学生或直接）", "sim-to-sim 验证", "真机部署，注意安全吊架"],
  fit: {
    yes: ["想做当下最热、最具话题性的方向", "工程能力强、能承受真机风险", "实验室有人形或预算"],
    no: ["没有硬件渠道", "不喜欢高强度工程与调试"]
  },
  trial: [
    ["Day 1–3", "读 DeepMimic、H2O、ASAP；安装 unitree_rl_gym 或 HumanoidVerse。"],
    ["Day 4–7", "训练 G1 行走策略，做 sim-to-sim（Isaac → MuJoCo）。"],
    ["Day 8–11", "把一段 AMASS 动作重定向到 G1，训练跟踪策略。"],
    ["Day 12–14", "观察失败动作，写下物理可行性问题的清单。"]
  ],
  classic: [
    ["DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills", "Peng et al.", 2018, "SIGGRAPH", "物理动作模仿。"],
    ["AMASS: Archive of Motion Capture as Surface Shapes", "Mahmood et al.", 2019, "ICCV", "统一动捕数据。"],
    ["AMP: Adversarial Motion Priors for Stylized Physics-Based Character Control", "Peng et al.", 2021, "SIGGRAPH", "对抗运动先验。"],
    ["Perpetual Humanoid Control for Real-time Simulated Avatars", "Luo et al.", 2023, "ICCV", "PHC 通用跟踪。"],
    ["Real-world humanoid locomotion with reinforcement learning", "Radosavovic et al.", 2024, "Science Robotics", "Transformer RL 人形行走。"]
  ],
  recent: [
    ["Learning Human-to-Humanoid Real-Time Whole-Body Teleoperation", "He et al.", 2024, "IROS", "H2O。"],
    ["Expressive Whole-Body Control for Humanoid Robots", "Cheng et al.", 2024, "RSS", "ExBody。"],
    ["OmniH2O: Universal and Dexterous Human-to-Humanoid Whole-Body Teleoperation and Learning", "He et al.", 2024, "CoRL", "通用遥操作。"],
    ["HumanPlus: Humanoid Shadowing and Imitation from Humans", "Fu et al.", 2024, "CoRL", "人类影随与模仿。"],
    ["ASAP: Aligning Simulation and Real-World Physics for Learning Agile Humanoid Whole-Body Skills", "He et al.", 2025, "RSS", "物理对齐。"],
    ["GR00T N1: An Open Foundation Model for Generalist Humanoid Robots", "NVIDIA", 2025, "arXiv", "人形基础模型。"]
  ]
},
{
  id: "21", name: "VLA", en: "Vision-Language-Action Models", branch: "robot",
  tagline: "把 VLM 的世界知识接到机器人的手上。通用机器人策略的主路线——但它“懂”多少、能泛化多远，仍有大量未知。",
  meters: [3, 4, 5, 5],
  leaves: ["动作表示与 Tokenizer", "连续动作头 Diffusion / Flow", "跨本体数据 Open X", "VLM 骨干初始化", "预训练 / 部署 / 微调", "推理延迟与实时执行", "分层 VLA 系统 1 / 2", "具身推理 Embodied CoT", "RL 微调 VLA", "评测与泛化", "世界模型 + VLA"],
  keywords: ["VLA", "pi0", "OpenVLA", "RT-2", "通用策略", "具身"],
  overview: [
    "VLA（视觉-语言-动作模型）以预训练 VLM 为骨干，输入图像与语言指令，输出机器人动作。RT-2（2023）首次把动作离散成 token 并与网络数据联合训练，展示了语义泛化；Octo 和 <b>OpenVLA</b> 在 Open X-Embodiment 上训练了开源通用策略。",
    "<b>π0</b>（Physical Intelligence，2024）用 VLM + 流匹配动作专家生成 50Hz 连续动作块，完成叠衣服等灵巧任务；π0.5 进一步展示在未见过的真实家庭中的开放世界泛化。动作表示（离散 token、FAST 压缩、连续扩散/流头）是关键设计轴。Gemini Robotics、GR00T N1 等工业模型把 VLA 推向“机器人基础模型”。",
    "核心开放问题：<b>VLA 到底继承了多少 VLM 知识</b>（微调时会遗忘）、<b>数据从哪来</b>、<b>推理延迟</b>（大模型 + 实时控制）、<b>如何评测</b>（真机难复现）、以及<b>能否通过 RL/在线经验自我改进</b>。"
  ],
  frontier: [
    ["动作专家与知识隔离", "π0 系列的流匹配动作头；如何训练动作部分而不破坏 VLM 知识（knowledge insulation）。"],
    ["高效微调", "OpenVLA-OFT：并行解码、动作分块、连续动作 + L1 损失，大幅提升速度与成功率。"],
    ["实时执行", "Real-Time Chunking 等解决大模型推理延迟下的平滑动作执行。"],
    ["具身推理", "在动作前生成子任务、边界框、轨迹等中间推理（ECoT、π0.5 的高层预测）。"],
    ["VLA 的 RL 后训练", "借鉴 LLM 的 RL 经验，在仿真或真机中用奖励改进 VLA。"]
  ],
  ideas: [
    ["VLA 用了多少语言与视觉知识？", "如果 VLA 在微调后其实忽略了语言、或只用了浅层视觉特征，那很多“通用”结论都要重新审视。系统诊断是高影响、低算力的工作。", "在 LIBERO 上对 OpenVLA / π0 做指令替换、指令删除、视觉干扰测试，量化语言与视觉依赖；用探针检查 VLM 知识保留程度。"],
    ["小数据下的有效微调范式", "大多数实验室只能为新任务采 50–200 条数据。什么样的微调（全参/LoRA/只训动作头/联合 VLM 数据）最能保持泛化，是普遍需求。", "用 openpi 在 3 个新任务上系统比较 4 种微调策略，测任务内成功率与 OOD 泛化。"],
    ["可复现的 VLA 评测协议", "真机结果几乎无法跨实验室比较。一个结合仿真（SimplerEnv、LIBERO）与标准化低成本真机设置的评测协议，会被广泛使用。", "用 SO-101 定义 10 个标准任务与物体集合，发布评测脚本，邀请 2–3 个实验室复现对同一模型的评测。"]
  ],
  prereq: {
    must: ["07 VLM 结构与微调", "11 模仿学习与动作表示（chunking、diffusion/flow 头）", "05 流匹配基础", "LeRobot / openpi / OpenVLA 代码", "机器人数据格式（RLDS / LeRobot dataset）"],
    nice: ["真实机器人经验（18）", "分布式训练（22）", "RL 后训练（06、10）"]
  },
  setup: {
    data: "预训练：Open X-Embodiment（100 万+ 轨迹、20+ 种机器人）、DROID；微调：每个新任务 50–200 条；仿真：LIBERO、SimplerEnv、CALVIN、RoboTwin。",
    compute: "OpenVLA 预训练用了 64×A100 约两周；微调：LoRA 单张 A100/H100 级（24GB 以上可做 LoRA），全参微调需多卡；推理需要 GPU 部署在机器人旁。",
    code: "openpi（π0 / π0.5）、OpenVLA / OpenVLA-OFT、LeRobot（含 SmolVLA）、Octo。",
    bench: "LIBERO 各套件成功率、SimplerEnv、真机成功率与泛化（新物体、新场景、新指令）、推理频率。",
    improve: "动作表示与动作头、训练配方（联合训练、冻结策略）、数据混合、推理速度、中间推理、RL 后训练。",
    venue: "CoRL / RSS / ICRA；NeurIPS / ICLR / CVPR"
  },
  recipe: ["选开源 VLA（π0 / OpenVLA-OFT）作基线", "在 LIBERO / Simpler 上复现官方数字", "提出改进（表示 / 训练 / 推理）", "仿真多套件评测 + 真机泛化测试", "开源权重与代码"],
  fit: {
    yes: ["想做通用机器人最主流的路线", "同时喜欢大模型与机器人", "有一定 GPU 与至少一台机械臂"],
    no: ["算力极有限", "不想处理真机数据采集"]
  },
  trial: [
    ["Day 1–3", "读 RT-2、OpenVLA、π0；跑 OpenVLA 或 π0 在 LIBERO 上的推理评测。"],
    ["Day 4–7", "用 LoRA 在一个 LIBERO 套件上微调，复现官方数字。"],
    ["Day 8–11", "做指令替换/删除测试，看模型是否真的“听懂”。"],
    ["Day 12–14", "若有 SO-101，用 LeRobot 采 50 条数据微调 SmolVLA/π0；写下发现的问题。"]
  ],
  classic: [
    ["Do As I Can, Not As I Say: Grounding Language in Robotic Affordances", "Ahn et al.", 2022, "CoRL", "SayCan：LLM 规划 + 技能。"],
    ["RT-1: Robotics Transformer for Real-World Control at Scale", "Brohan et al.", 2023, "RSS", "大规模真实数据 Transformer 策略。"],
    ["RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control", "Brohan et al.", 2023, "CoRL", "VLA 概念确立。"],
    ["Open X-Embodiment: Robotic Learning Datasets and RT-X Models", "Open X-Embodiment Collaboration", 2024, "ICRA", "跨本体数据。"],
    ["Octo: An Open-Source Generalist Robot Policy", "Octo Model Team", 2024, "RSS", "开源通用策略。"],
    ["OpenVLA: An Open-Source Vision-Language-Action Model", "Kim et al.", 2024, "CoRL", "开源 VLA 基线。"]
  ],
  recent: [
    ["Robotic Control via Embodied Chain-of-Thought Reasoning", "Zawalski et al.", 2024, "CoRL", "具身思维链。"],
    ["π0: A Vision-Language-Action Flow Model for General Robot Control", "Black et al.", 2024, "arXiv", "流匹配动作专家。"],
    ["FAST: Efficient Action Tokenization for Vision-Language-Action Models", "Pertsch et al.", 2025, "arXiv", "动作压缩 tokenizer。"],
    ["Fine-Tuning Vision-Language-Action Models: Optimizing Speed and Success", "Kim, Finn, Liang", 2025, "arXiv", "OpenVLA-OFT。"],
    ["π0.5: a Vision-Language-Action Model with Open-World Generalization", "Physical Intelligence", 2025, "arXiv", "开放世界泛化。"],
    ["Gemini Robotics: Bringing AI into the Physical World", "Gemini Robotics Team", 2025, "arXiv", "工业级 VLA。"],
    ["Real-Time Execution of Action Chunking Flow Policies", "Black, Galliker, Levine", 2025, "arXiv", "实时分块执行。"]
  ]
}
);
