import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Plus,
  Trash2,
  Tag,
  ArrowUpCircle,
  ArrowDownCircle,
  Pencil,
} from 'lucide-react';
import { useState } from 'react';
import {
  useCategories,
  useDeleteCategory,
} from '@/features/categories/hooks/useCategories';
import { AppPagination } from '@/components/ui/AppPagination';
import type { Category } from '@/features/categories/types/category.type';
import { cn } from '@/lib/utils';
import { CategoryForm } from '@/features/categories/components/CategoryForm';
import { TransactionType } from '@/features/transactions/types/transaction.type';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: categoriesResult, isLoading } = useCategories({
    page: currentPage,
    limit: itemsPerPage,
  });

  const categories = categoriesResult?.data || [];
  const meta = categoriesResult?.meta;
  const deleteCategory = useDeleteCategory();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined,
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Categories
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Organize your expenses and income sources.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Action buttons can be added here if needed in the future */}
          </div>
        </div>

        {/* Floating Action Button */}
        <Button
          size="icon"
          onClick={() => {
            setEditingCategory(undefined);
            setIsFormOpen(true);
          }}
          className="fixed bottom-28 md:bottom-8 right-6 md:right-8 w-14 h-14 rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/40 z-50 animate-in zoom-in duration-300"
        >
          <Plus className="w-6 h-6" />
        </Button>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent
            className="sm:max-w-md p-0 overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl"
            showCloseButton={false}
          >
            <CategoryForm
              initialData={editingCategory}
              onSuccess={() => {
                setIsFormOpen(false);
                setEditingCategory(undefined);
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingCategory(undefined);
              }}
            />
          </DialogContent>
        </Dialog>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-24 rounded-lg bg-slate-50 dark:bg-slate-900 animate-pulse border border-slate-100 dark:border-slate-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories?.map((category: Category) => (
              <Card
                key={category.id}
                className="group border-slate-200 dark:border-slate-800 hover:border-primary/50 rounded-lg transition-colors bg-white dark:bg-slate-950"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-md',
                          category.transactionType === TransactionType.EXPENSE
                            ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                            : 'bg-primary/10 text-primary',
                        )}
                      >
                        {category.transactionType ===
                        TransactionType.EXPENSE ? (
                          <ArrowDownCircle className="h-5 w-5" />
                        ) : (
                          <ArrowUpCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate">
                          {category.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {category.transactionType}
                          </span>
                          {category.isDefault && (
                            <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-tighter">
                              System
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-primary rounded-md"
                        onClick={() => {
                          setEditingCategory(category);
                          setIsFormOpen(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      {!category.isDefault && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-destructive rounded-md"
                          onClick={() => {
                            if (window.confirm(`Delete ${category.name}?`)) {
                              deleteCategory.mutate(category.id);
                            }
                          }}
                          disabled={deleteCategory.isPending}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {categories.length === 0 && (
              <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-slate-50/30 border-slate-200 dark:border-slate-800">
                <Tag className="h-8 w-8 opacity-20 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No categories found
                </h3>
                <p className="text-sm mt-1">
                  Start by adding your first category!
                </p>
                <Button
                  size="sm"
                  onClick={() => setIsFormOpen(true)}
                  className="mt-6 rounded-md font-bold h-10 px-6 bg-primary text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add your first category
                </Button>
              </div>
            )}
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="mt-8 mb-12 flex justify-center">
            <AppPagination
              currentPage={currentPage}
              totalPages={meta.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
