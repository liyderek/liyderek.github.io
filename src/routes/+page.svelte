<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';

	type ThemePreference = 'light' | 'dark' | 'system';

	const themeStorageKey = 'theme';
	let themePreference: ThemePreference = 'system';
	let resolvedTheme: 'light' | 'dark' = 'light';

	const languages = ['C', 'C++', 'Rust', 'Java', 'Svelte', 'Python'];
	const skills = ['Linux', 'NixOS', 'vim'];
	const specialties = ['Machine Learning', 'Algorithms'];
	const hobbies = ['Game dev', 'Going to the gym', 'Playing with my cat'];
	const apCourses = [
		'AP Precalculus',
		'AP Calculus BC',
		'AP Physics 1',
		'AP Physics 2',
		'AP Computer Science A',
		'AP Chinese'
	];
	const deAnzaCourses = ['Calc III', 'Calc IV', 'Introduction to x86 Processor Assembly Language'];

	const achievements = {
		math: [
			{ year: '2024', contest: 'AMC10', result: 'scored 118.5' },
			{ year: '2025', contest: 'AIME', result: 'scored 8' },
			{
				year: '2025',
				contest: 'SMT',
				result: 'Algebra top 25% honorable mention; team power round honorable mention'
			},
			{ year: '2025', contest: 'Gunn High Math Tournament', result: '13th place' },
			{ year: '2025', contest: 'BMT', result: 'Algebra DHM' },
			{ year: '2025', contest: 'AMC10', result: 'scored 121.5' },
			{ year: '2026', contest: 'AIME', result: 'scored 9' },
			{ year: '2026', contest: 'CMIMC', result: 'participated' },
			{
				year: '2026',
				contest: 'SMT',
				result:
					'Algebra test HM (top 25%), Team round HM (top 40%), Power round HM (top 25%), Guts round HM (top 40%), Overall DHM (top 25%)'
			}
		],
		programming: [
			{ year: '2025', contest: 'USACO', result: 'Passed silver with full score' },
			{ year: '2025', contest: 'MIT^2', result: 'top 50' },
			{ year: '2025', contest: 'April CALICO', result: 'in person 8th place' },
			{
				year: '2025',
				contest: 'Montgonmery Blair high school (mBIT) contest',
				result: '3rd place'
			},
			{ year: '2025', contest: 'Codesprint LA', result: '7th place' },
			{ year: '2026', contest: 'Harker programming invitational', result: '4th place' },
			{ year: '2026', contest: 'BISV hackathon', result: 'won Elevenlabs award' },
			{ year: '2026', contest: 'Teams code spring contest', result: '3rd place Advanced' },
			{ year: '2026', contest: 'USACO Gold', result: 'scored 333' }
		],
		music: [
			{
				year: '2025',
				contest: 'American Protege International Piano and String Competition',
				result: 'second place'
			},
			{
				year: '2025',
				contest: 'Monta Vista High School Symphonic band',
				result: 'Percussion principal player'
			}
		]
	};

	const activities = [
		'Monta Vista Applied Math Club - Director of outreach',
		'Monta Vista Rocketry Team - Team member'
	];

	const isThemePreference = (value: string | null): value is ThemePreference =>
		value === 'light' || value === 'dark' || value === 'system';

	const getSystemTheme = (): 'light' | 'dark' =>
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	const applyTheme = (theme: ThemePreference) => {
		resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
		document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
	};

	const setThemePreference = (theme: ThemePreference) => {
		themePreference = theme;
		localStorage.setItem(themeStorageKey, theme);
		applyTheme(theme);
	};

	onMount(() => {
		const savedTheme = localStorage.getItem(themeStorageKey);
		themePreference = isThemePreference(savedTheme) ? savedTheme : 'system';
		applyTheme(themePreference);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const updateFromSystemTheme = () => {
			if (themePreference === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', updateFromSystemTheme);

		return () => {
			mediaQuery.removeEventListener('change', updateFromSystemTheme);
		};
	});
</script>

<svelte:head>
	<title>Derek Li | Portfolio</title>
	<meta
		name="description"
		content="Portfolio of Derek Li, student developer focused on competitive programming, math, and machine learning."
	/>
</svelte:head>

<main
	class="relative min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_top,_#faf5e4_0%,_#f2f0ea_45%,_#e8ece9_100%)] px-4 py-12 md:px-8 dark:bg-[radial-gradient(circle_at_top,_#1b1a16_0%,_#1a1d1d_45%,_#111315_100%)]"
>
	<div
		class="pointer-events-none absolute -top-16 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-pink-400/30 blur-3xl dark:bg-pink-300/20"
	></div>
	<div
		class="pointer-events-none absolute top-1/3 right-0 h-56 w-56 rounded-full bg-rose-400/30 blur-3xl dark:bg-rose-300/20"
	></div>

	<div
		class="mx-auto flex w-full max-w-5xl animate-in flex-col gap-6 duration-700 fade-in slide-in-from-bottom-4"
	>
		<Card.Root
			class="border-stone-900/10 bg-white/85 shadow-lg backdrop-blur dark:border-white/10 dark:bg-stone-900/80"
		>
			<Card.Header class="gap-4">
				<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div class="flex items-start gap-4">
						<img
							src="https://github.com/liyderek.png"
							alt="Derek Li GitHub profile"
							class="mt-1 h-16 w-16 rounded-full border border-stone-300/80 object-cover shadow-sm dark:border-stone-600"
						/>
						<div>
							<p class="text-xs tracking-[0.2em] text-stone-500 uppercase dark:text-stone-400">
								Portfolio
							</p>
							<Card.Title
								class="mt-2 text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100"
								>Derek Li</Card.Title
							>
							<Card.Description class="mt-1 text-base text-stone-700 dark:text-stone-300"
								>Sophomore at Monta Vista High School in Cupertino, CA</Card.Description
							>
						</div>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<Button href="https://github.com/liyderek" target="_blank" rel="noreferrer"
							>GitHub</Button
						>
						<Button href="mailto:derekli21870@gmail.com" variant="outline">Email</Button>
						<div
							class="inline-flex items-center gap-2 rounded-lg border border-stone-300/70 bg-stone-100/70 px-2 py-1 dark:border-stone-700 dark:bg-stone-800/70"
						>
							<Sun class="size-3.5 text-amber-600 dark:text-stone-500" />
							<Switch
								checked={resolvedTheme === 'dark'}
								onCheckedChange={(checked) => setThemePreference(checked ? 'dark' : 'light')}
								aria-label="Toggle dark mode"
							/>
							<Moon class="size-3.5 text-stone-500 dark:text-cyan-300" />
						</div>
					</div>
				</div>

				<div class="flex flex-wrap gap-2">
					{#each specialties as item (item)}
						<Badge>{item}</Badge>
					{/each}
				</div>
			</Card.Header>
		</Card.Root>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="space-y-6">
				<Card.Root
					class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
				>
					<Card.Header>
						<Card.Title>Languages</Card.Title>
					</Card.Header>
					<Card.Content class="flex flex-wrap gap-2">
						{#each languages as language (language)}
							<Badge variant="secondary">{language}</Badge>
						{/each}
					</Card.Content>
				</Card.Root>

				<Card.Root
					class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
				>
					<Card.Header>
						<Card.Title>Skills</Card.Title>
					</Card.Header>
					<Card.Content class="flex flex-wrap gap-2">
						{#each skills as skill (skill)}
							<Badge variant="outline">{skill}</Badge>
						{/each}
					</Card.Content>
				</Card.Root>
			</div>

			<Card.Root
				class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
			>
				<Card.Header>
					<Card.Title>Current Projects</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div>
						<p class="font-medium text-stone-900 dark:text-stone-100">Stellar Learning</p>
						<p class="text-sm text-stone-700 dark:text-stone-300">
							AI powered study app. I am part of the core team and in charge of development for the
							competitive math module.
						</p>
					</div>
					<Separator />
					<div>
						<p class="font-medium text-stone-900 dark:text-stone-100">Scope</p>
						<p class="text-sm text-stone-700 dark:text-stone-300">
							Focus and scheduling app for people with ADHD and autism to concentrate and plan tasks
							and events.
						</p>
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<Card.Root
			class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
		>
			<Card.Header>
				<Card.Title>Education</Card.Title>
				<Card.Description>
					Monta Vista High School and De Anza College dual enrollment.
				</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-6 md:grid-cols-2">
				<section class="space-y-2 text-sm text-stone-800 dark:text-stone-200">
					<p class="font-medium text-stone-900 dark:text-stone-100">Current Schools</p>
					<ul class="space-y-1">
						<li><span class="font-semibold">Monta Vista High School</span> (Cupertino, CA)</li>
						<li><span class="font-semibold">De Anza College</span> (Dual Enrollment)</li>
					</ul>
					<p><span class="font-medium">GPA:</span> UW - 4.0, W - 4.46</p>
				</section>

				<section class="space-y-4 text-sm">
					<div>
						<p class="mb-2 font-medium text-stone-900 dark:text-stone-100">AP Courses</p>
						<div class="flex flex-wrap gap-2">
							{#each apCourses as course (course)}
								<Badge variant="secondary">{course}</Badge>
							{/each}
						</div>
					</div>
					<div>
						<p class="mb-2 font-medium text-stone-900 dark:text-stone-100">De Anza Courses</p>
						<div class="flex flex-wrap gap-2">
							{#each deAnzaCourses as course (course)}
								<Badge variant="outline">{course}</Badge>
							{/each}
						</div>
					</div>
				</section>
			</Card.Content>
		</Card.Root>

		<Card.Root
			class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
		>
			<Card.Header>
				<Card.Title>Achievements</Card.Title>
				<Card.Description>Math, programming, and music milestones.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<section>
					<h3
						class="mb-2 text-sm font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400"
					>
						Math
					</h3>
					<ul class="space-y-2 text-sm text-stone-800 dark:text-stone-200">
						{#each achievements.math as item (`${item.year}-${item.contest}`)}
							<li>
								<span class="font-semibold">{item.year}</span>
								<span class="font-semibold"> {item.contest}</span> - {item.result}
							</li>
						{/each}
					</ul>
				</section>
				<section>
					<h3
						class="mb-2 text-sm font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400"
					>
						Programming
					</h3>
					<ul class="space-y-2 text-sm text-stone-800 dark:text-stone-200">
						{#each achievements.programming as item (`${item.year}-${item.contest}`)}
							<li>
								<span class="font-semibold">{item.year}</span>
								<span class="font-semibold"> {item.contest}</span> - {item.result}
							</li>
						{/each}
					</ul>
				</section>
				<section>
					<h3
						class="mb-2 text-sm font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400"
					>
						Music
					</h3>
					<ul class="space-y-2 text-sm text-stone-800 dark:text-stone-200">
						{#each achievements.music as item (`${item.year}-${item.contest}`)}
							<li>
								<span class="font-semibold">{item.year}</span>
								<span class="font-semibold"> {item.contest}</span>: {item.result}
							</li>
						{/each}
					</ul>
				</section>
			</Card.Content>
		</Card.Root>

		<Card.Root
			class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
		>
			<Card.Header>
				<Card.Title>Activities</Card.Title>
			</Card.Header>
			<Card.Content>
				<ul class="space-y-2 text-sm text-stone-800 dark:text-stone-200">
					{#each activities as activity (activity)}
						<li>{activity}</li>
					{/each}
				</ul>
			</Card.Content>
		</Card.Root>

		<Card.Root
			class="border-stone-900/10 bg-white/80 shadow-md dark:border-white/10 dark:bg-stone-900/75"
		>
			<Card.Header>
				<Card.Title>Hobbies & interests</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-wrap gap-2">
				{#each hobbies as hobby (hobby)}
					<Badge variant="outline">{hobby}</Badge>
				{/each}
			</Card.Content>
		</Card.Root>
	</div>
</main>
