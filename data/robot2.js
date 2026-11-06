(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "17", name: "腿式运动", en: "Legged Locomotion", branch: "robot",
  tagline: "“在仿真里用 RL 学会走路”已基本被解决；前沿是看着走、跑酷、一个策略走遍所有身体，以及边走边干活。",
  meters: [3, 2, 4, 4],
  leaves: ["步态与支撑相", "静态 vs 动态平衡", "LIPM / ZMP", "凸 MPC 运动控制", "RL 运动控制", "教师-学生 / 特权学习", "地形课程", "感知运动 高度图 / 深度", "跑酷", "跨形态通用策略", "足式操作 Loco-manipulation"],
  keywords: ["locomotion", "quadruped", "四足", "parkour", "跑酷", "legged"],
  overview: [
    "经典方法基于简化模型：<b>ZMP / LIPM</b> 用于双足步行规划，<b>凸 MPC</b> 用于四足动态运动（MIT Cheetah 3）。它们可解释、稳定，但依赖精确模型与手工设计。",
    "2019–2022 年 ETH、Berkeley、CMU 的工作证明了 <b>RL + sim-to-real</b> 的路线：在仿真里训练、用域随机化和执行器网络迁移，配合<b>教师-学生蒸馏</b>（教师用特权信息如地形真值，学生只用本体感知或深度图）。legged_gym 让单卡 20 分钟训练出可上真机的行走策略。",
    "现在的前沿：<b>感知驱动的敏捷运动</b>（跑酷、攀爬）、<b>跨形态通用策略</b>（一个策略控制多种机器人）、<b>运动 + 操作</b>（四足带臂开门、推车），以及向人形（20）迁移。"
  ],
  frontier: [
    ["视觉跑酷与敏捷运动", "基于深度相机端到端学习攀爬、跳跃、跨越障碍。"],
    ["跨形态基础策略", "一个策略适配不同腿长、质量、关节配置的机器人。"],
    ["足式操作", "四足 + 机械臂的全身协调（开门、取物）。"],
    ["自然步态与能量效率", "用动物运动数据或对抗运动先验（AMP）得到更自然、更省电的步态。"],
    ["轮腿与混合形态", "轮足机器人兼顾速度与通过性。"]
  ],
  ideas: [
    ["一个策略控制任意形态", "每换一台机器人都重新训练是巨大浪费。跨形态泛化既是工程需求，也涉及形态表示等有趣问题。", "在 Isaac Lab 中程序化生成 100 种四足形态，训练形态条件策略，在未见形态上零样本测试。"],
    ["低成本感知下的鲁棒运动", "跑酷类工作依赖较好的深度相机。仅用廉价单目或噪声很大的传感器能做到什么程度，决定了能否普及。", "在仿真中给深度图加入真实噪声模型，或换成单目深度估计输入，比较策略鲁棒性。"],
    ["奖励设计的自动化", "运动控制的奖励常有十几项手工权重。用少量参考动作或偏好自动设计奖励，能大幅节省研究时间。", "用 LLM 生成奖励（Eureka 式）或从动作捕捉数据学习奖励，与手工奖励比较步态质量与调参时间。"]
  ],
  prereq: {
    must: ["10 强化学习，尤其是 PPO 与其调参", "16 仿真与域随机化", "14 中的动力学与 PD 控制", "legged_gym / Isaac Lab 的使用", "教师-学生蒸馏原理"],
    nice: ["凸 MPC 与 WBC", "动作捕捉数据与运动重定向", "真实四足部署经验（Unitree Go2 等）"]
  },
  setup: {
    data: "仿真自动生成；地形程序化生成；可选动物动捕数据。",
    compute: "单张 RTX 4090：平地行走数十分钟，复杂地形与感知策略数小时到一天。",
    code: "legged_gym、Isaac Lab、rsl_rl、MuJoCo Playground、walk-these-ways。",
    bench: "速度跟踪误差、各类地形通过率、能耗、摔倒率、真实世界测试视频。",
    improve: "奖励设计、地形课程、观测与特权信息设计、网络结构（注意力处理地形）、sim-to-real 技巧。",
    venue: "CoRL / RSS / ICRA / IROS；Science Robotics"
  },
  recipe: ["在 legged_gym / Isaac Lab 中设定任务与奖励", "教师策略（特权观测）训练", "学生策略蒸馏（真实可用观测）", "sim-to-sim 验证（如 Isaac → MuJoCo）", "真机部署 + 视频"],
  fit: {
    yes: ["想看到机器人真的跑起来", "接受大量调奖励与调参", "有四足机器人或能借用"],
    no: ["无法接触真实机器人又想做 sim-to-real"]
  },
  trial: [
    ["Day 1–3", "读 Learning to Walk in Minutes 与 RMA；安装 legged_gym 或 Isaac Lab。"],
    ["Day 4–7", "训练 Go2 / ANYmal 在粗糙地形行走，观察奖励各项曲线。"],
    ["Day 8–11", "改一个奖励项或课程设定，比较步态（看视频）。"],
    ["Day 12–14", "导出策略到 MuJoCo 做 sim-to-sim 测试；若有真机，尝试部署。"]
  ],
  classic: [
    ["Biped Walking Pattern Generation by using Preview Control of Zero-Moment Point", "Kajita et al.", 2003, "ICRA", "ZMP 预观控制。"],
    ["Dynamic Locomotion in the MIT Cheetah 3 Through Convex Model-Predictive Control", "Di Carlo et al.", 2018, "IROS", "凸 MPC。"],
    ["Learning quadrupedal locomotion over challenging terrain", "Lee et al.", 2020, "Science Robotics", "教师-学生 sim-to-real。"],
    ["RMA: Rapid Motor Adaptation for Legged Robots", "Kumar et al.", 2021, "RSS", "在线适应。"],
    ["Learning to Walk in Minutes Using Massively Parallel Deep Reinforcement Learning", "Rudin et al.", 2021, "CoRL", "legged_gym。"],
    ["Learning robust perceptive locomotion for quadrupedal robots in the wild", "Miki et al.", 2022, "Science Robotics", "感知运动。"]
  ],
  recent: [
    ["Walk These Ways: Tuning Robot Control for Generalization with Multiplicity of Behavior", "Margolis, Agrawal", 2022, "CoRL", "多行为策略。"],
    ["Robot Parkour Learning", "Zhuang et al.", 2023, "CoRL", "视觉跑酷。"],
    ["Extreme Parkour with Legged Robots", "Cheng et al.", 2024, "ICRA", "端到端深度跑酷。"],
    ["ANYmal parkour: Learning agile navigation for quadrupedal robots", "Hoeller et al.", 2024, "Science Robotics", "跑酷 + 导航。"]
  ]
},
{
  id: "18", name: "机器人操作", en: "Robot Manipulation", branch: "robot",
  tagline: "机器人学的“圣杯”：在开放世界里抓、放、拧、折、装。接触、多样性、长程任务是三座大山。",
  meters: [3, 3, 5, 5],
  leaves: ["抓取 6-DoF", "接触与力控", "触觉感知", "灵巧手 in-hand 操作", "双臂操作", "可变形物体", "感知与 Affordance", "任务与运动规划 TAMP", "长程任务", "移动操作", "真实世界 RL"],
  keywords: ["manipulation", "grasp", "抓取", "操作", "dexterous", "灵巧"],
  overview: [
    "操作研究的演进：<b>解析抓取</b>（力封闭）→ <b>数据驱动抓取</b>（Dex-Net、大规模自监督抓取）→ <b>端到端视觉运动策略</b>（Levine 等）→ <b>模仿学习 + 低成本硬件</b>（11）→ <b>通用策略 / VLA</b>（21）。",
    "并行的路线是<b>基础模型 + 结构化中间表示</b>：用 VLM/LLM 推理出关键点、约束、价值图（VoxPoser、ReKep），再交给规划器/控制器执行，泛化性好且无需大量机器人数据。",
    "难点依然集中在：<b>接触丰富任务</b>（插拔、拧螺丝需要力与触觉）、<b>灵巧手</b>（高维、易碎、难仿真）、<b>可变形物体</b>（布、绳、食物）、<b>长程任务</b>（误差累积、需要恢复）。真实世界 RL（HIL-SERL）证明了在线学习可以在数小时内把精细任务做到接近 100%。"
  ],
  frontier: [
    ["基础模型驱动的零样本操作", "VLM 推理关键点/约束 + 底层优化（ReKep、VoxPoser），无需任务演示。"],
    ["真实世界强化学习", "HIL-SERL 等结合人类干预，在真机上数小时学会高精度任务。"],
    ["灵巧手 sim-to-real", "在仿真中训练多指手的抓取与手内操作并迁移。"],
    ["3D 表示策略", "点云/体素策略（3D Diffusion Policy）在数据效率与泛化上优于 2D。"],
    ["双臂与移动操作", "家务级长程任务（叠衣、收拾）成为展示标杆。"]
  ],
  ideas: [
    ["失败可恢复的操作策略", "长程任务失败率 = 每步失败率的累积。检测失败并恢复比让每步更准往往更划算，却研究较少。", "在 LIBERO-Long 上为策略加一个失败检测器（VLM 或学习的），触发重试/回退，测长程成功率提升。"],
    ["触觉作为一等模态", "大多数策略只用视觉。在需要力判断的任务上（插入、擦拭、易碎物），触觉的收益有多大、如何高效融合，答案仍不清晰。", "在 3 个接触任务上比较纯视觉、视觉+触觉早融合、晚融合策略，数据量相同。"],
    ["基础模型规划 + 学习的底层技能", "零样本方法在精细动作上弱，学习方法在泛化上弱。清晰的接口设计（输出什么中间表示）能结合两者优势。", "用 VLM 输出关键点/子目标，底层用 Diffusion Policy 技能执行，与端到端 VLA 在新物体上对比。"]
  ],
  prereq: {
    must: ["14 机器人学基础（运动学、阻抗控制）", "11 模仿学习（Diffusion Policy / ACT）", "03 视觉基础与点云处理", "相机标定（手眼标定）与坐标系管理", "一个操作仿真器（ManiSkill / robosuite / LIBERO）"],
    nice: ["10 强化学习（真实 RL / sim-to-real）", "触觉传感（15）", "TAMP 与符号规划", "VLM 使用（07）"]
  },
  setup: {
    data: "每任务 50–500 条演示；大规模 Open X-Embodiment（100 万+ 轨迹）、DROID（7.6 万轨迹）；仿真基准 LIBERO、RoboCasa、CALVIN、ManiSkill。",
    compute: "单任务策略单卡；多任务/VLA 微调 1–8 卡。",
    code: "LeRobot、robomimic、robosuite、ManiSkill3、3D Diffusion Policy、HIL-SERL 官方仓库。",
    bench: "成功率（真机每设置 ≥20 次）、对新物体/新场景/扰动的泛化、完成时间。",
    improve: "观测表示（2D/3D/触觉）、动作表示、数据采集与增广、中间表示（关键点、affordance）、恢复机制、RL 微调。",
    venue: "CoRL / RSS / ICRA / IROS；Science Robotics"
  },
  recipe: ["定义任务与评测协议（物体、位置分布、试验次数）", "仿真基准复现基线", "提出方法，先仿真验证", "真机实验（多任务、泛化测试）", "失败分析 + 视频"],
  fit: {
    yes: ["想做机器人最核心的问题", "动手能力强、能忍受真机实验的低效", "对产业（家庭/工厂机器人）感兴趣"],
    no: ["没有任何硬件条件又不想只做仿真"]
  },
  trial: [
    ["Day 1–3", "读 ReKep 与 Diffusion Policy；在 ManiSkill 或 LIBERO 中跑通基线。"],
    ["Day 4–7", "实现一个 VLM + 关键点的零样本抓取放置 demo（仿真）。"],
    ["Day 8–11", "训练一个 3D Diffusion Policy 与 2D 版本对比数据效率。"],
    ["Day 12–14", "选一个失败模式（新物体/扰动），写下你会怎么改。"]
  ],
  classic: [
    ["End-to-End Training of Deep Visuomotor Policies", "Levine et al.", 2016, "JMLR", "端到端视觉运动策略。"],
    ["Dex-Net 2.0: Deep Learning to Plan Robust Grasps with Synthetic Point Clouds and Analytic Grasp Metrics", "Mahler et al.", 2017, "RSS", "数据驱动抓取。"],
    ["Learning Hand-Eye Coordination for Robotic Grasping with Deep Learning and Large-Scale Data Collection", "Levine et al.", 2018, "IJRR", "大规模抓取数据。"],
    ["QT-Opt: Scalable Deep Reinforcement Learning for Vision-Based Robotic Manipulation", "Kalashnikov et al.", 2018, "CoRL", "真实世界大规模 RL。"],
    ["Transporter Networks: Rearranging the Visual World for Robotic Manipulation", "Zeng et al.", 2020, "CoRL", "空间动作表示。"],
    ["Integrated Task and Motion Planning", "Garrett et al.", 2021, "Annual Review of CRAS", "TAMP 综述。"]
  ],
  recent: [
    ["VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models", "Huang et al.", 2023, "CoRL", "LLM 生成价值图。"],
    ["3D Diffusion Policy: Generalizable Visuomotor Policy Learning via Simple 3D Representations", "Ze et al.", 2024, "RSS", "点云策略。"],
    ["DROID: A Large-Scale In-The-Wild Robot Manipulation Dataset", "Khazatsky et al.", 2024, "RSS", "多样化真实数据。"],
    ["Open X-Embodiment: Robotic Learning Datasets and RT-X Models", "Open X-Embodiment Collaboration", 2024, "ICRA", "跨本体数据集。"],
    ["ReKep: Spatio-Temporal Reasoning of Relational Keypoint Constraints for Robotic Manipulation", "Huang et al.", 2024, "CoRL", "关键点约束。"],
    ["Precise and Dexterous Robotic Manipulation via Human-in-the-Loop Reinforcement Learning", "Luo et al.", 2025, "Science Robotics", "HIL-SERL。"]
  ]
},
{
  id: "19", name: "导航", en: "Navigation", branch: "robot",
  tagline: "知道自己在哪、要去哪、怎么过去。经典 SLAM 很成熟，前沿在开放词汇、语言指令、长期记忆和端到端驾驶。",
  meters: [3, 2, 4, 5],
  leaves: ["SLAM / 定位 AMCL", "地图表示 占据栅格 / 拓扑", "全局 / 局部规划 A* / DWA", "视觉导航 PointNav / ObjectNav", "视觉-语言导航 VLN", "开放词汇语义地图", "3D 场景图", "前沿探索", "社会导航", "自动驾驶与轨迹预测", "导航基础模型"],
  keywords: ["navigation", "SLAM", "VLN", "导航", "自动驾驶", "driving"],
  overview: [
    "经典导航栈：<b>SLAM / 定位</b>（ORB-SLAM、AMCL）→ <b>地图</b>（占据栅格）→ <b>全局规划</b>（A*）→ <b>局部规划</b>（DWA、TEB）。ROS Nav2 是工业标准，在已知环境中相当可靠。",
    "具身 AI 研究把导航变成学习问题：<b>Habitat</b> 等仿真平台上的 PointNav（DD-PPO 几乎解决）、<b>ObjectNav</b>（找到“椅子”）、<b>VLN</b>（按自然语言指令行走）。当前主流是模块化：开放词汇感知（CLIP/Grounding DINO）+ 语义地图 / 3D 场景图 + 规划，或 VLM 直接决策。",
    "另一大分支是<b>自动驾驶</b>：从感知-预测-规划的模块化，到端到端规划（UniAD，CVPR 2023 最佳论文），再到 VLA 与世界模型驱动的驾驶。<b>导航基础模型</b>（ViNT、NoMaD）尝试一个模型跨机器人通用。"
  ],
  frontier: [
    ["VLM / 视频大模型做导航", "NaVid、Uni-NaVid 等用视频语言模型直接输出导航动作。"],
    ["开放词汇 3D 场景表示", "ConceptGraphs 等构建可查询的 3D 场景图，支持“去拿厨房里红色杯子”。"],
    ["导航基础模型", "跨机器人、跨环境的通用视觉导航策略。"],
    ["端到端自动驾驶", "端到端规划、驾驶 VLA、基于世界模型的闭环评测（NAVSIM 等）。"],
    ["长期记忆与终身导航", "在环境变化中持续更新地图与记忆。"]
  ],
  ideas: [
    ["导航中的空间记忆与推理", "MLLM 的空间推理弱（07），导航正好是检验和改进它的天然场景。显式记忆结构如何与 VLM 结合是关键问题。", "在 Habitat 中比较“纯视频上下文”“拓扑图记忆”“3D 场景图记忆”三种方式对长程 ObjectNav 的影响。"],
    ["真实世界零样本导航的失败分析", "仿真上数字很高，真实部署频繁失败。系统性的真实失败分类能为领域指明方向。", "在真实楼宇中部署 2–3 个开源方法各 50 次任务，分类失败（感知、规划、定位、指令理解）。"],
    ["开放词汇地图的更新与遗忘", "环境是会变的（物体被移动）。语义地图怎么检测变化、何时信任旧信息，几乎没有成熟方案。", "在仿真中移动物体，比较不同地图更新策略的寻物成功率与重新探索成本。"]
  ],
  prereq: {
    must: ["14 中的坐标变换与状态估计", "经典规划算法 A* / RRT / DWA", "SLAM 基本原理与一个开源实现使用", "03 视觉基础与开放词汇检测", "Habitat 或 ROS Nav2 的使用"],
    nice: ["强化学习（10）", "VLM（07）", "自动驾驶数据集与 BEV 感知"]
  },
  setup: {
    data: "Habitat-Matterport 3D（HM3D，约 1000 个场景）、Gibson、MP3D；VLN：R2R、RxR；驾驶：nuScenes、Waymo Open、NAVSIM。",
    compute: "模块化方法单卡；RL 训练导航策略需多卡数天；驾驶端到端模型 8 卡以上。",
    code: "Habitat-Sim / Habitat-Lab、ROS 2 Nav2、ConceptGraphs、ViNT / NoMaD、UniAD。",
    bench: "成功率 SR、SPL（路径效率）、nDTW（VLN）；驾驶：碰撞率、L2 误差、PDMS。",
    improve: "地图表示、探索策略、指令理解、记忆机制、sim-to-real、端到端规划。",
    venue: "CVPR / ICCV / CoRL / ICRA / IROS / RSS；驾驶相关也投 CVPR / ECCV"
  },
  recipe: ["选任务（ObjectNav / VLN / 驾驶）与仿真/数据集", "复现基线", "提出方法（表示 / 记忆 / 决策）", "仿真评测 + 真实部署", "失败分析"],
  fit: {
    yes: ["对空间、地图、几何感兴趣", "想做自动驾驶或服务机器人", "喜欢模块化系统设计"],
    no: ["不喜欢系统集成与调试"]
  },
  trial: [
    ["Day 1–3", "读 Habitat 与 ViNT；安装 Habitat-Sim 跑 PointNav 示例。"],
    ["Day 4–7", "实现一个简单的 CLIP + 语义地图 ObjectNav 管线。"],
    ["Day 8–11", "跑 ConceptGraphs 或类似开源项目，查询一个场景。"],
    ["Day 12–14", "比较两种方法在 20 个场景上的失败原因。"]
  ],
  classic: [
    ["The Dynamic Window Approach to Collision Avoidance", "Fox, Burgard, Thrun", 1997, "IEEE RAM", "DWA。"],
    ["A Frontier-Based Approach for Autonomous Exploration", "Yamauchi", 1997, "CIRA", "前沿探索。"],
    ["ORB-SLAM: a Versatile and Accurate Monocular SLAM System", "Mur-Artal, Montiel, Tardós", 2015, "T-RO", "视觉 SLAM 经典。"],
    ["Vision-and-Language Navigation: Interpreting Visually-Grounded Navigation Instructions in Real Environments", "Anderson et al.", 2018, "CVPR", "VLN 任务。"],
    ["Habitat: A Platform for Embodied AI Research", "Savva et al.", 2019, "ICCV", "具身仿真平台。"],
    ["DD-PPO: Learning Near-Perfect PointGoal Navigators from 2.5 Billion Frames", "Wijmans et al.", 2020, "ICLR", "大规模 RL 导航。"],
    ["Object Goal Navigation using Goal-Oriented Semantic Exploration", "Chaplot et al.", 2020, "NeurIPS", "语义地图 + 探索。"]
  ],
  recent: [
    ["DROID-SLAM: Deep Visual SLAM for Monocular, Stereo, and RGB-D Cameras", "Teed, Deng", 2021, "NeurIPS", "学习式 SLAM。"],
    ["Planning-oriented Autonomous Driving", "Hu et al.", 2023, "CVPR", "UniAD，最佳论文。"],
    ["ViNT: A Foundation Model for Visual Navigation", "Shah et al.", 2023, "CoRL", "导航基础模型。"],
    ["NoMaD: Goal Masked Diffusion Policies for Navigation and Exploration", "Sridhar et al.", 2024, "ICRA", "扩散导航策略。"],
    ["ConceptGraphs: Open-Vocabulary 3D Scene Graphs for Perception and Planning", "Gu et al.", 2024, "ICRA", "开放词汇场景图。"],
    ["NaVid: Video-based VLM Plans the Next Step for Vision-and-Language Navigation", "Zhang et al.", 2024, "RSS", "视频 VLM 导航。"]
  ]
}
);
