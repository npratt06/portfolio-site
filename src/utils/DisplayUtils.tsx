import { PageInfo } from '../components/Navigation/NavDisplay/NavDisplay.interface';

export function getCurrentPageInfo(pages: PageInfo[], navIndex: number): PageInfo {
    const currentPage = pages.find((page) => {
        return page.key === navIndex;
    });
    if (!currentPage) throw new Error(`Could not get currentPage in NavDisplay.`);
    return currentPage;
};