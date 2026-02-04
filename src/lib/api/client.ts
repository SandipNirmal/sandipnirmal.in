// API Client for Abhyas Backend

const API_BASE_URL = 'https://abhyas-api.fly.dev';

export interface Question {
	id: string;
	question_type: 'MCQ' | 'MSQ' | 'NAT' | 'SUBJECTIVE';
	question_text: string;
	options: Record<string, string> | null;
	correct_answer: string;
	explanation?: string;
	difficulty?: 'easy' | 'medium' | 'hard';
	language: string;
	source?: string;
	source_year?: number;
	metadata?: Record<string, unknown>;
	created_at: string;
}

export interface Exam {
	id: string;
	name: string;
	description?: string;
	duration_minutes?: number;
	total_marks?: number;
	negative_marking_ratio?: number;
	sections?: ExamSection[];
}

export interface ExamSection {
	id: string;
	exam_id: string;
	code: string;
	name: string;
	marks?: number;
	question_count?: number;
}

export interface Topic {
	id: string;
	name: string;
	slug: string;
	domain_id?: string;
	parent_id?: string;
	description?: string;
}

export interface ApiResponse<T> {
	data: T;
	meta?: {
		page: number;
		limit: number;
		total: number;
		total_pages: number;
	};
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;
	const response = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers
		}
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Unknown error' }));
		throw new Error(error.message || `HTTP ${response.status}`);
	}

	return response.json();
}

// Questions API
export async function getQuestions(params?: {
	exam_id?: string;
	topic_id?: string;
	difficulty?: string;
	page?: number;
	limit?: number;
}): Promise<ApiResponse<Question[]>> {
	const searchParams = new URLSearchParams();
	if (params?.exam_id) searchParams.set('exam_id', params.exam_id);
	if (params?.topic_id) searchParams.set('topic_id', params.topic_id);
	if (params?.difficulty) searchParams.set('difficulty', params.difficulty);
	if (params?.page) searchParams.set('page', params.page.toString());
	if (params?.limit) searchParams.set('limit', params.limit.toString());

	const query = searchParams.toString();
	return fetchApi<ApiResponse<Question[]>>(`/api/v1/questions${query ? `?${query}` : ''}`);
}

export async function getQuestion(id: string): Promise<ApiResponse<Question>> {
	return fetchApi<ApiResponse<Question>>(`/api/v1/questions/${id}`);
}

// Exams API
export async function getExams(): Promise<ApiResponse<Exam[]>> {
	return fetchApi<ApiResponse<Exam[]>>('/api/v1/exams');
}

export async function getExam(id: string): Promise<ApiResponse<Exam>> {
	return fetchApi<ApiResponse<Exam>>(`/api/v1/exams/${id}`);
}

// Topics API
export async function getTopics(params?: {
	search?: string;
	limit?: number;
}): Promise<ApiResponse<Topic[]>> {
	const searchParams = new URLSearchParams();
	if (params?.search) searchParams.set('search', params.search);
	if (params?.limit) searchParams.set('limit', params.limit.toString());

	const query = searchParams.toString();
	return fetchApi<ApiResponse<Topic[]>>(`/api/v1/topics${query ? `?${query}` : ''}`);
}
