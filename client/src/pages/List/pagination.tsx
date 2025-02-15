import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis } from '@/components/ui/pagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router';

export const ItemsPagination = ({ page, totalPages }: { page: number; totalPages: number }) => {
    const [_, setSearchParams] = useSearchParams();

    if (totalPages < 2) return null;
    return (
        <Pagination>
            <PaginationContent>
                {/* Назад */}
                <PaginationItem>
                    <Button
                        onClick={() => setSearchParams({ page: String(page - 1) })}
                        variant='ghost'
                        disabled={page === 1}
                    >
                        <ArrowLeft />
                    </Button>
                </PaginationItem>

                {/* Первая страница */}
                <PaginationItem>
                    <Button
                        onClick={() =>
                            setSearchParams((params) => {
                                params.set('page', String(1));
                                return params;
                            })
                        }
                        variant={page === 1 ? 'outline' : 'ghost'}
                        disabled={page === 1}
                    >
                        1
                    </Button>
                </PaginationItem>

                {/* Промежуточные ... */}
                {page > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Несколько страниц перед текущей */}
                {page > 2 && (
                    <PaginationItem>
                        <Button
                            onClick={() =>
                                setSearchParams((params) => {
                                    params.set('page', String(page - 1));
                                    return params;
                                })
                            }
                            variant='ghost'
                        >
                            {page - 1}
                        </Button>
                    </PaginationItem>
                )}

                {/* Текущая страница */}
                {page !== 1 && page !== totalPages && (
                    <PaginationItem>
                        <Button variant='outline' disabled>
                            {page}
                        </Button>
                    </PaginationItem>
                )}

                {/* Несколько страниц после текущей */}
                {page < totalPages - 1 && (
                    <PaginationItem>
                        <Button
                            onClick={() =>
                                setSearchParams((params) => {
                                    params.set('page', String(page + 1));
                                    return params;
                                })
                            }
                            variant='ghost'
                        >
                            {page + 1}
                        </Button>
                    </PaginationItem>
                )}

                {/* Промежуточные ... */}
                {page < totalPages - 2 && (
                    <PaginationItem>
                        {' '}
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Последняя страница */}
                {totalPages > 1 && (
                    <PaginationItem>
                        <Button
                            onClick={() =>
                                setSearchParams((params) => {
                                    params.set('page', String(totalPages));
                                    return params;
                                })
                            }
                            variant={page === totalPages ? 'outline' : 'ghost'}
                            disabled={page === totalPages}
                        >
                            {totalPages}
                        </Button>
                    </PaginationItem>
                )}

                {/* Вперед */}
                <PaginationItem>
                    <Button
                        onClick={() => setSearchParams({ page: String(page + 1) })}
                        variant={'ghost'}
                        disabled={page === totalPages}
                    >
                        <ArrowRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
