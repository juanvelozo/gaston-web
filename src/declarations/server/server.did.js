export const idlFactory = ({ IDL }) => {
  const CreateCategoryRequest = IDL.Record({
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'color' : IDL.Text,
    'description' : IDL.Text,
  });
  const Category = IDL.Record({
    'id' : IDL.Nat,
    'userId' : IDL.Principal,
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'color' : IDL.Text,
    'description' : IDL.Text,
    'updatedAt' : IDL.Int,
  });
  const ApiError = IDL.Variant({
    'NotFound' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'InternalError' : IDL.Text,
    'BadRequest' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : Category, 'err' : ApiError });
  const TransactionType = IDL.Variant({
    'INCOME' : IDL.Null,
    'EXPENSE' : IDL.Null,
  });
  const CreateTransactionRequest = IDL.Record({
    'categoryId' : IDL.Opt(IDL.Nat),
    'title' : IDL.Text,
    'type' : TransactionType,
    'description' : IDL.Opt(IDL.Text),
    'amount' : IDL.Nat,
  });
  const Transaction = IDL.Record({
    'id' : IDL.Nat,
    'categoryId' : IDL.Opt(IDL.Nat),
    'title' : IDL.Text,
    'userId' : IDL.Principal,
    'createdAt' : IDL.Int,
    'type' : TransactionType,
    'description' : IDL.Opt(IDL.Text),
    'updatedAt' : IDL.Int,
    'amount' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : Transaction, 'err' : ApiError });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(Category), 'err' : ApiError });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(Transaction),
    'err' : ApiError,
  });
  const TransferResult = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const UpdateCategoryRequest = IDL.Record({
    'id' : IDL.Nat,
    'icon' : IDL.Opt(IDL.Text),
    'name' : IDL.Opt(IDL.Text),
    'color' : IDL.Opt(IDL.Text),
    'description' : IDL.Opt(IDL.Text),
  });
  const UpdateTransactionRequest = IDL.Record({
    'id' : IDL.Nat,
    'categoryId' : IDL.Opt(IDL.Nat),
    'title' : IDL.Opt(IDL.Text),
    'type' : IDL.Opt(TransactionType),
    'description' : IDL.Opt(IDL.Text),
    'amount' : IDL.Opt(IDL.Nat),
  });
  return IDL.Service({
    'createCategory' : IDL.Func([CreateCategoryRequest], [Result_1], []),
    'createTransaction' : IDL.Func([CreateTransactionRequest], [Result], []),
    'getBalance' : IDL.Func([IDL.Principal], [IDL.Nat], []),
    'getCategories' : IDL.Func([], [Result_3], []),
    'getFee' : IDL.Func([], [IDL.Nat], []),
    'getTransactions' : IDL.Func([], [Result_2], []),
    'sendICP' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TransferResult],
        [],
      ),
    'updateCategory' : IDL.Func([UpdateCategoryRequest], [Result_1], []),
    'updateTransaction' : IDL.Func([UpdateTransactionRequest], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
