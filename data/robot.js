(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "14", name: "机器人学基础", en: "Robotics Fundamentals", branch: "robot",
  tagline: "学习方法之下的物理层：位姿、运动学、动力学、控制与规划。不懂这些，你设计的动作空间和奖励往往是错的。",
  meters: [3, 1, 2, 4],
  leaves: ["刚体运动 SO(3) / SE(3)", "正逆运动学 / DH 参数", "动力学 / 拉格朗日", "状态估计 / 卡尔曼滤波", "PID / LQR / Lyapunov", "运动规划 RRT / A*", "轨迹优化", "MPC 模型预测控制", "操作空间控制 OSC", "接触力学", "控制障碍函数 CBF", "ROS 2"],
  keywords: ["kinematics", "control", "MPC", "运动学", "控制", "ROS"],
  overview: [
    "经典机器人学回答四个问题：<b>机器人在哪</b>（状态估计、SLAM）、<b>怎么动</b>（运动学与动力学建模）、<b>动到哪</b>（运动规划与轨迹优化）、<b>如何稳稳地动</b>（反馈控制）。这些方法有理论保证、可解释、数据需求极低。",
    "学习方法兴起后，经典方法没有消失，而是变成了<b>底层</b>：VLA 输出末端位姿，由逆运动学与阻抗控制执行；腿式 RL 策略输出关节目标，由 PD 控制器跟踪；MPC 与学习的动力学结合；控制障碍函数（CBF）为学习策略加安全约束。",
    "作为研究方向，前沿是<b>学习与模型的融合</b>：可微仿真与可微 MPC、GPU 并行的采样式 MPC（MPPI）、扩散模型做轨迹优化、接触隐式规划，以及为学习策略提供可证安全保障。"
  ],
  frontier: [
    ["GPU 并行规划与 MPC", "cuRobo、MPPI 的 GPU 实现让碰撞避免的运动生成达到毫秒级。"],
    ["接触隐式优化", "在优化中直接处理接触模式切换，用于灵巧操作与腿式运动。"],
    ["生成模型做规划", "扩散模型学习轨迹分布作为规划先验（Motion Planning Diffusion 等）。"],
    ["学习策略 + 安全层", "CBF / 可达性分析为 RL 与 VLA 策略提供约束，是部署的关键。"],
    ["可微仿真与系统辨识", "MuJoCo MJX 等可微引擎让基于梯度的辨识与控制更实用。"]
  ],
  ideas: [
    ["把经典控制先验注入 VLA 动作空间", "VLA 直接输出关节或位姿增量，忽略了阻抗、力、接触。在动作空间中加入阻抗参数或力目标，是用经典知识改进学习系统的优雅方式。", "在仿真插孔/擦桌任务中，比较“纯位置动作”与“位置 + 刚度”动作空间下 Diffusion Policy 的成功率与接触力。"],
    ["学习策略的轻量安全过滤器", "部署学习策略最大的顾虑是安全。一个即插即用、几乎不损失性能的安全层有很强实用价值。", "为一个 RL 导航或操作策略设计 CBF 过滤器，测碰撞率下降与任务成功率损失。"],
    ["经典 vs 学习的公平对比", "很多学习方法论文的经典基线调得很差。认真调好的 MPC/TAMP 基线对比，常常能纠正领域认知。", "选一个流行的学习方法基准任务，认真实现 MPC 或规划基线，报告真实差距。"]
  ],
  prereq: {
    must: ["线性代数与刚体变换：旋转矩阵、四元数、齐次变换、李群 SO(3)/SE(3) 基础", "正逆运动学、雅可比矩阵", "PID、状态空间、LQR、稳定性基本概念", "运动规划：A*、RRT、轨迹优化思想", "Python + 一个仿真器（MuJoCo 或 PyBullet）"],
    nice: ["凸优化与 CasADi", "卡尔曼滤波与状态估计", "ROS 2 实际使用", "Lynch & Park《Modern Robotics》课程"]
  },
  setup: {
    data: "基于模型，数据需求低；系统辨识需要少量真实轨迹。",
    compute: "CPU 即可；GPU 并行 MPC/规划需一张卡。",
    code: "MuJoCo、Pinocchio、Drake、CasADi、OMPL、cuRobo、ROS 2。",
    bench: "跟踪误差、规划时间与成功率、约束违反次数、能耗、真实机器人实验。",
    improve: "模型精度、优化求解速度、接触处理、与学习组件的接口、安全保证。",
    venue: "ICRA / IROS / RSS / CoRL；T-RO、IJRR、RA-L"
  },
  recipe: ["建立系统模型（或用仿真器）", "定义任务与约束", "设计控制/规划方法，必要时给出稳定性或可行性分析", "仿真验证 + 真实机器人实验", "与学习方法和经典基线比较"],
  fit: {
    yes: ["喜欢数学建模与工程", "想做机器人且希望根基扎实", "自动化/机械/控制背景"],
    no: ["只想做纯数据驱动的端到端学习"]
  },
  trial: [
    ["Day 1–3", "看《Modern Robotics》第 3–6 章（刚体运动、正逆运动学）视频课。"],
    ["Day 4–7", "在 MuJoCo 中加载 Franka 模型，实现逆运动学让末端画圆。"],
    ["Day 8–11", "实现操作空间控制或一个简单 MPC 完成到点任务，调参观察。"],
    ["Day 12–14", "用 OMPL 或 cuRobo 做一次避障规划，把它接到一个学习策略后面当执行层。"]
  ],
  classic: [
    ["A New Approach to Linear Filtering and Prediction Problems", "Kalman", 1960, "J. Basic Engineering", "卡尔曼滤波。"],
    ["A Unified Approach for Motion and Force Control of Robot Manipulators: The Operational Space Formulation", "Khatib", 1987, "IEEE J. Robotics and Automation", "操作空间控制。"],
    ["Rapidly-Exploring Random Trees: A New Tool for Path Planning", "LaValle", 1998, "Tech Report", "RRT。"],
    ["Probabilistic Robotics", "Thrun, Burgard, Fox", 2005, "MIT Press", "概率机器人学经典。"],
    ["CHOMP: Gradient Optimization Techniques for Efficient Motion Planning", "Ratliff et al.", 2009, "ICRA", "轨迹优化。"],
    ["MuJoCo: A physics engine for model-based control", "Todorov, Erez, Tassa", 2012, "IROS", "最常用物理引擎。"],
    ["Modern Robotics: Mechanics, Planning, and Control", "Lynch, Park", 2017, "Cambridge Univ. Press", "入门教材。"],
    ["Control Barrier Functions: Theory and Applications", "Ames et al.", 2019, "ECC", "安全约束。"]
  ],
  recent: [
    ["Information Theoretic MPC for Model-Based Reinforcement Learning", "Williams et al.", 2017, "ICRA", "MPPI。"],
    ["cuRobo: Parallelized Collision-Free Robot Motion Generation", "Sundaralingam et al.", 2023, "ICRA", "GPU 运动生成。"],
    ["Motion Planning Diffusion: Learning and Planning of Robot Motions with Diffusion Models", "Carvalho et al.", 2023, "IROS", "扩散做规划。"],
    ["MuJoCo Playground", "Zakka et al.", 2025, "arXiv", "GPU 并行 MuJoCo 生态。"]
  ]
},
{
  id: "15", name: "机器人硬件", en: "Robot Hardware", branch: "robot",
  tagline: "硬件决定学习的上限。开源低成本硬件正在让机器人研究从“少数实验室的特权”变成“每个人桌上的项目”。",
  meters: [4, 1, 2, 5],
  leaves: ["电机类型 有刷 / 无刷", "FOC 电流控制", "减速器 谐波 / 行星", "准直驱 QDD", "串联弹性执行器 SEA", "IMU / 编码器 / 力矩传感器", "触觉传感器", "灵巧手", "电源与热管理", "通信 CAN / EtherCAT", "开源低成本平台"],
  keywords: ["hardware", "actuator", "电机", "触觉", "灵巧手", "SO-100"],
  overview: [
    "机器人硬件的核心是<b>执行器</b>：电机 + 减速器 + 驱动器 + 传感器。高减速比（谐波减速器）精度高但难以感知外力、易损坏；<b>准直驱（QDD）</b>执行器（MIT Cheetah 路线）用低减速比换取力透明性与抗冲击能力，成为腿式与人形机器人主流。",
    "感知硬件同样关键：<b>触觉</b>（GelSight 类视觉触觉、电子皮肤）是灵巧操作的瓶颈，<b>灵巧手</b>（LEAP Hand、Allegro）在成本、耐用性与自由度间权衡。",
    "开源低成本硬件改变了研究生态：SO-100/101 机械臂（数百美元）、Koch、ALOHA 双臂、LEAP Hand、Berkeley Humanoid Lite、Unitree 的商用四足与人形。硬件研究正越来越多地以“<b>为学习而设计</b>”为目标：便于采集数据、便于 sim-to-real、耐摔、便宜。"
  ],
  frontier: [
    ["低成本灵巧手与触觉", "LEAP Hand、AnySkin、DIGIT 等让灵巧+触觉研究门槛大幅降低。"],
    ["开源人形与四足", "3D 打印 + 商用电机的开源人形（Berkeley Humanoid Lite 等），以及 Unitree G1 等平台普及。"],
    ["数据采集设备", "UMI 手持夹爪、外骨骼与动捕遥操作，把数据采集成本降低一个数量级。"],
    ["执行器建模", "执行器网络、电机热模型、摩擦与回差建模，直接决定 sim-to-real 成败。"]
  ],
  ideas: [
    ["为大规模数据采集设计的平台", "数据是机器人学习的瓶颈，而采集成本主要由硬件决定。一个更便宜、更快、更易部署的采集设备会被大量实验室采用。", "在 SO-101 或 UMI 基础上改进一个环节（如加入触觉/力反馈或更快的标定），测每小时有效演示数与策略性能。"],
    ["低成本触觉 + 视觉融合", "高质量触觉传感器贵且脆弱。廉价的触觉信号能否显著提升策略成功率，是很实际的问题。", "在夹爪上加磁性或压阻式廉价触觉皮肤，在需要接触判断的任务上比较有无触觉的策略成功率。"],
    ["执行器模型对 sim-to-real 的影响量化", "大家知道执行器建模重要，但很少有系统量化。哪个参数最关键？", "在一个开源四足上分别对摩擦、延迟、扭矩饱和建模，做 sim-to-real 消融。"]
  ],
  prereq: {
    must: ["电路与电子基础：电源、电机驱动、传感器接口", "嵌入式开发：STM32 / ESP32、串口 / CAN 通信", "电机控制原理：PID、FOC 基本概念", "机械设计与 3D 打印（Onshape / Fusion / SolidWorks）", "14 中的运动学基础"],
    nice: ["PCB 设计（KiCad）", "实时系统与 EtherCAT", "材料与结构强度基本知识"]
  },
  setup: {
    data: "硬件研究以实测数据为主：扭矩曲线、带宽、效率、耐久测试。",
    compute: "几乎不需要 GPU；需要示波器、电源、3D 打印机等工具。",
    code: "ODrive / moteus 驱动固件、LeRobot（SO-100/101 支持）、ROS 2 驱动。",
    bench: "扭矩密度、带宽、回差、成本、耐久性、以及搭载学习策略后的任务成功率。",
    improve: "成本、可靠性、传感能力、易用性、对学习的友好程度（如易建模、易复位）。",
    venue: "ICRA / IROS / RSS / CoRL；RA-L、T-RO、Science Robotics"
  },
  recipe: ["明确设计目标与约束（成本、力、精度）", "原型设计与迭代", "定量测试执行器/传感器性能", "在学习任务上验证价值", "开源 BOM、CAD 与固件"],
  fit: {
    yes: ["喜欢动手做东西", "机械/电子/自动化背景", "想走机器人创业或工业路线"],
    no: ["不想处理烧电机、断线、拧螺丝的日常"]
  },
  trial: [
    ["Day 1–3", "了解 SO-101 / Koch / ALOHA 的 BOM 与组装文档；学习舵机与无刷电机基础。"],
    ["Day 4–7", "组装一台 SO-101（或用开发板控制一个舵机/无刷电机做位置与电流控制）。"],
    ["Day 8–11", "用 LeRobot 完成标定与遥操作，采 20 条演示。"],
    ["Day 12–14", "测一个硬件指标（重复定位精度、延迟），思考它如何影响学习。"]
  ],
  classic: [
    ["Series Elastic Actuators", "Pratt, Williamson", 1995, "IROS", "串联弹性执行器。"],
    ["Proprioceptive Actuator Design in the MIT Cheetah: Impact Mitigation and High-Bandwidth Physical Interaction for Dynamic Legged Robots", "Wensing et al.", 2017, "T-RO", "准直驱设计原理。"],
    ["GelSight: High-Resolution Robot Tactile Sensors for Estimating Geometry and Force", "Yuan, Dong, Adelson", 2017, "Sensors", "视觉触觉。"],
    ["Mini Cheetah: A Platform for Pushing the Limits of Dynamic Quadruped Control", "Katz, Di Carlo, Kim", 2019, "ICRA", "低成本高性能四足。"],
    ["DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor with Application to In-Hand Manipulation", "Lambeta et al.", 2020, "RA-L", "低成本触觉。"]
  ],
  recent: [
    ["LEAP Hand: Low-Cost, Efficient, and Anthropomorphic Hand for Robot Learning", "Shaw, Agarwal, Pathak", 2023, "RSS", "低成本灵巧手。"],
    ["Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots", "Chi et al.", 2024, "RSS", "数据采集硬件。"],
    ["AnySkin: Plug-and-play Skin Sensing for Robotic Touch", "Bhirangi et al.", 2025, "ICRA", "可替换触觉皮肤。"],
    ["Berkeley Humanoid Lite: An Open-source, Accessible, and Customizable 3D-printed Humanoid Robot", "Chi et al.", 2025, "RSS", "开源人形。"]
  ]
},
{
  id: "16", name: "仿真与 sim-to-real", en: "Simulation & Sim-to-Real", branch: "robot",
  tagline: "在仿真里训练一万年，在现实里一次成功。GPU 仿真让数据近乎免费，真正的难题是那道“现实鸿沟”。",
  meters: [3, 3, 4, 5],
  leaves: ["物理引擎 MuJoCo / Isaac / PhysX", "GPU 大规模并行仿真", "域随机化", "系统辨识", "执行器网络", "Real2Sim / 数字孪生", "3DGS 真实感渲染", "仿真评测", "接触与可变形体", "延迟与噪声建模", "生成式仿真"],
  keywords: ["simulation", "sim2real", "Isaac", "MuJoCo", "仿真", "域随机化"],
  overview: [
    "仿真让机器人获得近乎无限的试错数据。<b>域随机化</b>（随机化纹理、质量、摩擦等）让策略对仿真误差鲁棒；<b>系统辨识</b>与<b>执行器网络</b>让仿真更贴近真实。OpenAI 的灵巧手魔方、ETH 的 ANYmal 野外行走都靠这两招。",
    "<b>GPU 并行仿真</b>（Isaac Gym/Lab、MuJoCo MJX、ManiSkill3、Genesis）让单卡同时运行数千个环境，腿式运动策略训练从几天缩短到几十分钟，这是 17、20 爆发的直接原因。",
    "当前前沿：<b>Real2Sim</b>（用 3DGS/重建从真实场景快速构建仿真）、<b>仿真评测</b>（用仿真预测通用策略真实表现，如 SIMPLER）、<b>生成式仿真</b>（自动生成任务和资产），以及接触丰富与可变形物体的仿真精度。"
  ],
  frontier: [
    ["GPU 仿真生态", "Isaac Lab、MuJoCo Playground、ManiSkill3、Genesis：并行 + 渲染 + 易用性竞争。"],
    ["Real2Sim2Real", "手机扫描 → 3DGS/网格 → 物理场景 → 训练 → 部署，缩小视觉与几何差距。"],
    ["仿真评测通用策略", "SIMPLER 等研究仿真成功率与真实成功率的相关性。"],
    ["生成式仿真", "用 LLM/生成模型自动生成任务、场景与奖励（RoboGen、GenSim）。"],
    ["可变形与流体", "布料、绳索、液体操作的仿真精度与速度。"]
  ],
  ideas: [
    ["仿真评测的可信度研究", "如果仿真成功率能可靠预测真实表现，机器人研究的迭代速度会提高一个数量级。哪些因素决定这种相关性，几乎没人系统研究。", "构建 5–10 个策略的仿真与真实评测对，分别变化视觉保真度、物理参数精度，测排名相关性如何变化。"],
    ["从手机视频自动构建可交互数字孪生", "Real2Sim 流程仍需大量人工。自动化（分割物体、估计物理属性、生成碰撞体）会极大降低门槛。", "组合 SAM 2 + 3DGS/网格重建 + VLM 估计质量与摩擦，测从视频到可训练仿真场景的时间与 sim-to-real 成功率。"],
    ["自动学习域随机化范围", "域随机化的范围靠人调，太宽学不会，太窄迁移不了。用少量真实数据自动调整是很实际的问题。", "用少量真实轨迹做贝叶斯优化或可微辨识自动设定随机化分布，和手工设定对比迁移成功率。"]
  ],
  prereq: {
    must: ["14 机器人学基础（动力学与控制）", "10 强化学习（PPO 是 sim-to-real 主力）", "至少一个仿真器的深入使用（Isaac Lab 或 MuJoCo）", "URDF / MJCF 机器人描述格式", "域随机化与系统辨识原理"],
    nice: ["3D 重建（04）", "GPU 编程与 JAX", "真实机器人部署经验"]
  },
  setup: {
    data: "仿真中自动生成；真实数据用于辨识与验证；资产来自 Objaverse、PartNet-Mobility。",
    compute: "单张 RTX 4090 可并行数千环境；大规模视觉 RL 需多卡。",
    code: "Isaac Lab、MuJoCo / MJX / Playground、ManiSkill3、Genesis、PyBullet。",
    bench: "真实世界成功率、sim-to-real 性能差、仿真速度（FPS）、仿真-真实评测相关性。",
    improve: "随机化策略、辨识方法、执行器/传感器建模、渲染真实感、资产生成与标注。",
    venue: "CoRL / RSS / ICRA / IROS；NeurIPS D&B（仿真平台）"
  },
  recipe: ["在仿真中构建任务与机器人模型", "训练策略（通常 PPO + 域随机化）", "辨识关键参数缩小差距", "真实部署并量化差距", "消融：哪些随机化/建模最关键"],
  fit: {
    yes: ["喜欢系统工程", "想做腿式/人形/灵巧手", "有真实机器人或合作方"],
    no: ["完全没有真实机器人渠道（sim-to-real 需要 real）"]
  },
  trial: [
    ["Day 1–3", "安装 Isaac Lab 或 MuJoCo Playground，跑通官方示例。"],
    ["Day 4–7", "训练一个四足平地行走策略，观察并行环境数量对训练时间的影响。"],
    ["Day 8–11", "加入/去掉域随机化，在另一个仿真器（MuJoCo）中测试迁移（sim-to-sim 是很好的代理）。"],
    ["Day 12–14", "读 SIMPLER 与 Real2Sim 相关论文，写下你认为最大的现实鸿沟。"]
  ],
  classic: [
    ["MuJoCo: A physics engine for model-based control", "Todorov, Erez, Tassa", 2012, "IROS", "物理引擎。"],
    ["Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World", "Tobin et al.", 2017, "IROS", "域随机化。"],
    ["Sim-to-Real Transfer of Robotic Control with Dynamics Randomization", "Peng et al.", 2018, "ICRA", "动力学随机化。"],
    ["Learning agile and dynamic motor skills for legged robots", "Hwangbo et al.", 2019, "Science Robotics", "执行器网络。"],
    ["Solving Rubik's Cube with a Robot Hand", "OpenAI et al.", 2019, "arXiv", "自动域随机化。"],
    ["Learning Dexterous In-Hand Manipulation", "OpenAI et al.", 2020, "IJRR", "灵巧手 sim-to-real。"]
  ],
  recent: [
    ["Isaac Gym: High Performance GPU-Based Physics Simulation For Robot Learning", "Makoviychuk et al.", 2021, "NeurIPS D&B", "GPU 仿真。"],
    ["RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning via Generative Simulation", "Wang et al.", 2024, "ICML", "生成式仿真。"],
    ["Evaluating Real-World Robot Manipulation Policies in Simulation", "Li et al.", 2024, "CoRL", "SIMPLER。"],
    ["ManiSkill3: GPU Parallelized Robotics Simulation and Rendering for Generalizable Embodied AI", "Tao et al.", 2025, "RSS", "操作仿真。"],
    ["MuJoCo Playground", "Zakka et al.", 2025, "arXiv", "GPU MuJoCo。"]
  ]
}
);
