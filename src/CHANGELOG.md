# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-05-21

### Added
- Initial application scaffolding with Next.js, Tailwind CSS, and ShadCN.
- Core UI components for navigation, layout, and theming.
- Genkit setup for AI-powered features, including a general chatbot and a lesson-specific expert.
- A comprehensive library of 80 English lessons with explanations, examples, and quizzes.
- Interactive, animated background for the dashboard.
- A `CHANGELOG.md` file to track project updates.

### Fixed
- **Major**: Rearchitected all AI service calls to use the Cloudflare AI Gateway, resolving persistent "Unauthorized" and "Bad Request" errors.
- **Major**: Refactored the AI-powered quiz generation to be significantly more reliable and performant by generating questions in parallel.
- Resolved multiple build and hydration errors related to server components and client-side rendering.
- Corrected CSS and Tailwind configuration to enable background animations.
- Fixed layout issues to ensure all content in the lesson dialog is scrollable.
- Removed redundant header title on the home screen.
- Corrected various environment variable issues causing authentication failures on the server.
- Fixed incorrect JSON payloads being sent to Cloudflare AI models.
