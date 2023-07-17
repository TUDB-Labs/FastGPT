import { GET, POST, DELETE, PUT } from './request';
import type { ChatHistoryItemType } from '@/types/chat';
import type { InitChatResponse, InitShareChatResponse } from './response/chat';
import { RequestPaging } from '../types/index';
import type { ShareChatSchema } from '@/types/mongoSchema';
import type { ShareChatEditType } from '@/types/app';
import type { QuoteItemType } from '@/pages/api/app/modules/kb/search';
import type { Props as UpdateHistoryProps } from '@/pages/api/chat/history/updateChatHistory';

/**
 * 获取初始化聊天内容
 */
export const getInitChatSiteInfo = (data: { appId: string; historyId?: string }) =>
  GET<InitChatResponse>(`/chat/init`, data);

/**
 * 获取历史记录
 */
export const getChatHistory = (data: RequestPaging & { appId?: string }) =>
  POST<ChatHistoryItemType[]>('/chat/history/getHistory', data);

/**
 * 删除一条历史记录
 */
export const delChatHistoryById = (id: string) => GET(`/chat/removeHistory?id=${id}`);

/**
 * get history quotes
 */
export const getHistoryQuote = (params: { historyId: string; contentId: string }) =>
  GET<(QuoteItemType & { _id: string })[]>(`/chat/history/getHistoryQuote`, params);

/**
 * update history quote status
 */
export const updateHistoryQuote = (params: {
  historyId: string;
  contentId: string;
  quoteId: string;
  sourceText: string;
}) => PUT(`/chat/history/updateHistoryQuote`, params);

/**
 * 删除一句对话
 */
export const delChatRecordByIndex = (data: { historyId: string; contentId: string }) =>
  DELETE(`/chat/delChatRecordByContentId`, data);

/**
 * 修改历史记录: 标题/置顶
 */
export const putChatHistory = (data: UpdateHistoryProps) =>
  PUT('/chat/history/updateChatHistory', data);

/**
 * create a shareChat
 */
export const createShareChat = (
  data: ShareChatEditType & {
    appId: string;
  }
) => POST<string>(`/chat/shareChat/create`, data);

/**
 * get shareChat
 */
export const getShareChatList = (appId: string) =>
  GET<ShareChatSchema[]>(`/chat/shareChat/list`, { appId });

/**
 * delete a  shareChat
 */
export const delShareChatById = (id: string) => DELETE(`/chat/shareChat/delete?id=${id}`);

/**
 * 初始化分享聊天
 */
export const initShareChatInfo = (data: { shareId: string }) =>
  GET<InitShareChatResponse>(`/chat/shareChat/init`, data);