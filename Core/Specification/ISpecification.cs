using System.Linq.Expressions;

namespace Core.Specification
{
    public interface ISpecification<T>
    {
         Expression<Func<T, bool>> Criteria {get;}
         List<Expression<Func<T, object>>> Includes {get;}

         Expression<Func<T, object>> OrederBy {get;}

         Expression<Func<T, object>> OrederByDescending {get;}

         int Take {get;}

         int Skip {get;}

         bool IsPagingEnabled {get;}


    }
}